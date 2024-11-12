import { type FC, memo, useContext, useEffect, useMemo, useState } from 'react'

import { Text } from '@codemirror/state'
import { Box, ClickAwayListener, Popover } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { setPrevLessonCode, setPrevLessonId } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import AddComment from './components/add-comment'
import CommentPopup from './components/comment-popup'
import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import StatusLabel, { RoomStatus } from './components/status-label'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { BASIC_SETUP, EditorMode } from './hook/constants'
import { useFileManager } from './hook/file-manager'
import { useStyles } from './styles'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  portalSocket?: Socket
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCodemirrorValue?: (value: string) => void
}

const DEBOUNCE_TIME = 30000
let checkValueTimeout: any | null = null
const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  roomId,
  className,
  portalSocket,
  preloadedCode,
  withFileManager = true,
  mode = EditorMode.Owner,
  defaultFileName = 'index.html',
  isReadOnly: _isReadOnly = false,
  isMultipleExtensionFiles = false,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
  onChangeStreamingDocInfo: onChangeStreamingDocInfoFromProps,
  ...collabProps
}) => {
  const styles = useStyles()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const { user } = useAuthContext()
  const searchParams = useSearchParams()
  const codePanelContext = useContext(CodePanelContext)

  const [codeValue, setCodeValue] = useState<string | undefined>('')

  const rootSocket = useSelector((state) => state.codePanelGlobal.socket)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)
  const prevLessonCode = useSelector((state) => state.codePanelGlobal.prevLessonCode)

  const lessonIdFromQuery = query?.lessonId
  const sandbox = searchParams.get('sandbox')

  // Given the fact that we use the same editor block for portals and root editor
  // we are spliting the socket logic here
  const socket = portalSocket || rootSocket

  const { changeLessonStatus } = useSocketController(socket)

  const {
    activeFile,
    isFileFormOpen,
    isOpen,
    setIsOpen,
    fileList,
    setIsFileFormOpen,
    onAddFile,
    addedFileList,
    onDeleteFileWithEvents,
    onChangeFileWithEvents,
    ...collabPropsFromFileManager
  } = useFileManager({
    socket,
    roomId,
    mode,
  })

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    if (!doc.htmlBody?.[0]?.length && !doc.jsBody?.[0]?.length && !doc.cssBody?.[0]?.length) {
      return
    }

    if (checkValueTimeout) clearTimeout(checkValueTimeout)

    if (lessonId && user) changeLessonStatus(lessonId)

    checkValueTimeout = setTimeout(
      (previousLength: number) => {
        if (doc?.htmlBody?.length === previousLength) {
          changeLessonStatus(lessonId!)
        }
      },
      DEBOUNCE_TIME,
      doc?.htmlBody?.length
    )

    onChangeStreamingDocInfoFromProps?.(doc)
  }

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    codePanelContext.studentCodeChange(value)
    onChangeStreamingDocInfoFromProps?.(value as any)
    if (value) {
      const localStorageKey = getLocalStorageRoomKey(
        `${lessonId}${lessonIdFromQuery}${activeFile?.id}`
      )
      localStorage.setItem(localStorageKey, value)
    }
    void updateCommentWidgetPosition()
  }

  const localstorageCode = useMemo(() => {
    if (!lessonId && !lessonIdFromQuery) {
      if (!sandbox) {
        return
      }
    }
    if (mode === EditorMode.Owner) {
      if (prevLessonCode) {
        return prevLessonCode
      }
      const localStorageKey = getLocalStorageRoomKey(
        `${lessonId}${lessonIdFromQuery}${activeFile?.id}`
      )
      const localStorageCodeValue = localStorage.getItem(localStorageKey)
      if (localStorageCodeValue) {
        try {
          const docInfo = JSON.parse(localStorageCodeValue) as Record<string, string>
          const code = prevLessonCode ?? (docInfo?.htmlBody as unknown as string[])?.join('')
          if (code) {
            return code
          }
        } catch (e) {
          return localStorageCodeValue
        }
      }
    }
  }, [mode, query?.lessonId, prevLessonId, preloadedCode, lessonId, activeFile])

  const {
    editorRef,
    extensions,
    streamingDoc,
    setStreamingDoc,
    key,
    onCreateEditor,
    roomStatus,
    commentProps: {
      onContextMenu,
      isAddCommentDisabled,
      isAddCommentOpen,
      position,
      setIsAddCommentOpen,
      onAddComment,
      isCommentPopupOpen,
      commentPopupProps,
      onCloseCommentPopup,
      onRemoveComment,
      onRemoveCommentGroup,
      updateCommentWidgetPosition,
    },
  } = useCodeEditorCollab({
    ...collabProps,
    ...collabPropsFromFileManager,
    onChangeStreamingDocInfo,
    preloadedCode: localstorageCode ?? preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
    cursorText: user?.first_name,
  })

  useEffect(() => {
    onChangeCodemirrorValue((localstorageCode ?? preloadedCode) || '')
  }, [preloadedCode, localstorageCode])

  useEffect(() => {
    const newCodeValue =
      localstorageCode ??
      prevLessonCode ??
      (streamingDoc && streamingDoc.toString().length ? streamingDoc?.toString() : preloadedCode)

    setCodeValue(newCodeValue)
  }, [preloadedCode, localstorageCode, streamingDoc])

  useEffect(() => {
    // TODO: check it and remove in case of unnecessary
    return () => {
      dispatch(setPrevLessonId(null))
      dispatch(setPrevLessonCode(null))
    }
  }, [])

  useEffect(() => {
    if (!preloadedCode) return
    window.addEventListener('reset-lesson-event', (event) => {
      if (preloadedCode) {
        onChangeCodemirrorValue(preloadedCode as string)
        setCodeValue(preloadedCode as string)
        setStreamingDoc(Text.of([preloadedCode]))
      } else {
        onChangeCodemirrorValue('')
        setCodeValue('')
        setStreamingDoc(Text.of(['']))
      }
    })
  }, [preloadedCode])

  return (
    <div
      className={`${styles.wrapper} code-editor-wrapper`}
      ref={editorRef}
    >
      {withFileManager && (
        <>
          <FileModal
            isOpen={isOpen}
            isFileFormOpen={isFileFormOpen}
            setActiveFile={onChangeFileWithEvents}
            setIsOpen={setIsOpen}
            fileList={fileList}
            setIsFileFormOpen={setIsFileFormOpen}
            onAddFile={onAddFile}
            onDeleteFile={onDeleteFileWithEvents}
            mode={mode}
            isMultipleExtensionFiles={isMultipleExtensionFiles}
          />

          <FileSwitcher
            activeFile={activeFile}
            onChange={onChangeFileWithEvents}
            fileList={addedFileList}
          />
        </>
      )}

      <StatusLabel status={roomStatus} />

      {
        <>
          <CodeMirror
            onContextMenu={onContextMenu}
            onCreateEditor={onCreateEditor}
            key={key}
            className={className}
            height='100%'
            basicSetup={BASIC_SETUP}
            theme='dark'
            extensions={extensions}
            readOnly={_isReadOnly || roomStatus === RoomStatus.Inactive}
            value={codeValue}
            onChange={onChangeCodemirrorValue}
          />

          <CommentPopup
            {...commentPopupProps}
            isOpen={isCommentPopupOpen}
            onClose={onCloseCommentPopup}
            onRemoveComment={onRemoveComment}
            onRemoveCommentGroup={onRemoveCommentGroup}
            activeFile={activeFile}
          />

          <Popover
            classes={{ root: styles.popover }}
            anchorReference='anchorPosition'
            open={isAddCommentOpen}
            anchorPosition={position}
          >
            <ClickAwayListener onClickAway={() => setIsAddCommentOpen(false)}>
              <Box>
                <AddComment
                  isDisabled={isAddCommentDisabled}
                  onAddComment={onAddComment}
                  onClose={() => setIsAddCommentOpen(false)}
                />
              </Box>
            </ClickAwayListener>
          </Popover>
        </>
      }
    </div>
  )
}

const useSocketController = (socket?: Socket) => {
  const router = useRouter()
  const { user } = useAuthContext()

  const lessonIdFromRoute = router.query.lessonId

  useEffect(() => {
    if (!socket) return

    socket.emit(
      'joinLesson',
      JSON.stringify({ lesson: lessonIdFromRoute, user: user?.student_profile?.id })
    )

    return () => {
      socket?.emit(
        'leaveLesson',
        JSON.stringify({ lesson: lessonIdFromRoute, user: user?.student_profile?.id })
      )
    }
  }, [lessonIdFromRoute, socket])

  return {
    changeLessonStatus: (lessonId: string) => {
      socket?.emit('changeStatusInLesson', {
        lesson: lessonId,
        user: user?.id,
        status: 'active',
      })
    },
  }
}

export default memo(CodeEditorCollab)
