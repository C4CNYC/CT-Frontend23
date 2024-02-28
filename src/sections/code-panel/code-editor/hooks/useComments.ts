import {
  type RefObject,
  type MutableRefObject,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react'

import { type ReactCodeMirrorProps, StateEffectType, EditorView } from '@uiw/react-codemirror'
import pDebounce from 'p-debounce'
import { Socket } from 'socket.io-client'

import type { CommentEffect } from '@/sections/code-panel/code-editor/extensions/comments/types'
import { CommentWidget } from '@/sections/code-panel/code-editor/extensions/comments/widget'
import {
  type CommentGroup,
  type WidgetPosition,
  addCommentToGroup,
  createCommentGroup,
  removeCommentGroup,
  removeCommentFromGroup,
  updateCommentPosition,
} from '@/sections/code-panel/code-editor/utils/requests/comments'

import { SubscribedCommentsEvents } from '../../lib/socket'
import { getSelectionRange } from '../utils'

import { COMMENT_TYPE } from './constants'

interface UseCommentsProps {
  editorView: RefObject<EditorView>
  socket?: Socket
  roomId: string
  cursorText: string
  activeFile: string
}

export interface UseCommentsPropsReturn {
  position: Position
  isAddCommentOpen: boolean
  onContextMenu: ReactCodeMirrorProps['onContextMenu']
  setIsAddCommentOpen: (isOpen: boolean) => void
  isAddCommentDisabled: boolean
  onAddComment: (v: string) => void
  commentEffectRef: MutableRefObject<StateEffectType<CommentEffect> | null>
  commentPopupProps: CommentPopupProps | null
  isCommentPopupOpen: boolean
  onCommentIconClick: (props: CommentPopupProps | null) => void
  onCloseCommentPopup: () => void
  onRemoveCommentGroup: (groupId: string) => Promise<void>
  onRemoveComment: (props: OnRemoveComment) => Promise<void>
  updateCommentWidgetPosition: () => Promise<void>
}

export interface Position {
  left: number
  top: number
}

export const DEFAULT_POSITION = {
  left: 0,
  top: 0,
}

interface WidgetElement extends Element {
  cmView: {
    widget: CommentWidget
    posAtEnd: number | null
  }
}

export interface CommentPopupProps extends Omit<CommentGroup, 'position'> {
  position: WidgetPosition
}

interface OnRemoveComment {
  groupId: string
  commentId: string
}

const RESET_POPUP_DELAY = 300
const UPDATE_POSITION_DELAY = 400

export const useComments = ({
  editorView,
  socket,
  roomId,
  cursorText,
  activeFile,
}: UseCommentsProps): UseCommentsPropsReturn => {
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false)
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION)
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false)
  const [commentPopupProps, setCommentPopupProps] = useState<CommentPopupProps | null>(null)
  const commentEffectRef = useRef<StateEffectType<CommentEffect> | null>(null)
  const resetPopupTimeoutRef = useRef<NodeJS.Timeout>()

  const updateCommentWidgetPosition = useMemo(() => {
    return pDebounce(async () => {
      if (socket == null) {
        return
      }

      const items = (editorView.current?.contentDOM.querySelectorAll('.comment-icon') ??
        []) as WidgetElement[]

      for (let item of items) {
        const groupId = item.cmView.widget.commentWidgetProps?.id
        const position = item.cmView.posAtEnd

        if (groupId != null) {
          await updateCommentPosition(socket, {
            roomId,
            fileId: activeFile,
            groupId,
            position,
          })
        }
      }
    }, UPDATE_POSITION_DELAY)
  }, [editorView, roomId, activeFile])

  const onCommentIconClick = useCallback((props: CommentPopupProps | null) => {
    setCommentPopupProps(props)
    setIsCommentPopupOpen(true)
  }, [])

  const onCloseCommentPopup = useCallback(() => {
    setIsCommentPopupOpen(false)

    resetPopupTimeoutRef.current = setTimeout(() => {
      setCommentPopupProps(null)
    }, RESET_POPUP_DELAY)
  }, [])

  const onRemoveCommentGroup = async (groupId: string) => {
    if (socket == null) {
      return
    }

    const isDeleted = await removeCommentGroup(socket, { roomId, groupId, fileId: activeFile })

    if (isDeleted) {
      onCloseCommentPopup()
      editorView.current?.dispatch({
        effects: commentEffectRef.current?.of({
          type: COMMENT_TYPE,
          status: 'deleted',
          id: groupId,
          comments: [],
          position: null,
          from: 0,
          to: 0,
        }),
      })
    }
  }

  const onRemoveComment = async (props: OnRemoveComment): Promise<void> => {
    if (socket == null) {
      return
    }

    if (commentPopupProps?.comments.length === 1) {
      await onRemoveCommentGroup(props.groupId)
      return
    }

    await removeCommentFromGroup(socket, {
      roomId,
      fileId: activeFile,
      ...props,
    })
  }

  const onContextMenu: ReactCodeMirrorProps['onContextMenu'] = (e) => {
    e.preventDefault()
    setPosition({ left: e.pageX, top: e.pageY })
    setIsAddCommentOpen(true)
  }

  const isAddCommentDisabled = useMemo(() => {
    const selection = getSelectionRange(editorView.current)

    return selection != null ? selection.from === selection.to : true
  }, [isAddCommentOpen, editorView])

  const onAddComment = async (comment: string) => {
    const selection = getSelectionRange(editorView.current)

    if (selection == null || editorView.current == null || socket == null) {
      return
    }

    const line = editorView.current.state.doc.lineAt(selection.to)
    const allLines = editorView.current.contentDOM.querySelectorAll('.cm-line')
    const currentLine = allLines[line.number - 1] as WidgetElement | null
    const commentIcon = currentLine?.querySelector('.comment-icon') as WidgetElement | null
    const groupId = commentIcon?.cmView.widget.commentWidgetProps?.id

    if (groupId != null) {
      await addCommentToGroup(socket, {
        roomId,
        name: cursorText,
        body: comment,
        doc: selection.doc,
        fileId: activeFile,
        groupId,
      })

      return
    }

    const commentGroup = await createCommentGroup(socket, {
      roomId,
      name: cursorText,
      body: comment,
      doc: selection.doc,
      fileId: activeFile,
    })

    if (commentGroup == null) {
      return
    }

    editorView.current?.dispatch({
      effects: commentEffectRef.current?.of({
        type: COMMENT_TYPE,
        ...selection,
        ...commentGroup,
      }),
    })
  }

  useEffect(() => {
    if (!isCommentPopupOpen || commentPopupProps?.id == null || socket == null) {
      return
    }

    const commentUpdateEvent = `${SubscribedCommentsEvents.CommentGroupUpdated}${roomId}${activeFile}${commentPopupProps.id}`

    socket.on(commentUpdateEvent, (group: CommentGroup | null) => {
      if (group == null) {
        onCloseCommentPopup()
        return
      }

      setCommentPopupProps((prev) => {
        if (prev == null) {
          return prev
        }

        return {
          ...prev,
          comments: group.comments,
        }
      })
    })

    return () => {
      socket.off(commentUpdateEvent)
    }
  }, [isCommentPopupOpen, socket, commentPopupProps?.id, roomId, activeFile, onCloseCommentPopup])

  useEffect(() => {
    return () => {
      clearTimeout(resetPopupTimeoutRef.current)
    }
  }, [])

  return {
    position,
    setIsAddCommentOpen,
    isAddCommentOpen,
    onContextMenu,
    isAddCommentDisabled,
    onAddComment,
    commentEffectRef,
    isCommentPopupOpen,
    commentPopupProps,
    onCommentIconClick,
    onCloseCommentPopup,
    onRemoveCommentGroup,
    onRemoveComment,
    updateCommentWidgetPosition,
  }
}
