import { type FC, memo, useEffect, useMemo } from 'react'

import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { useAuthContext } from '@/auth/useAuthContext'
import { setPrevLessonCode, setPrevLessonId } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'

import CommentPopup from './components/comment-popup'
import { ColabContextMenu } from './components/context-menu'
import LoadingCodeEditor from './components/loading-code-editor'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { EditorMode } from './hook/constants'
import { type File } from './hook/requests'
import { CodeEditorBlockWrapper } from './styles'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  activeFile?: File
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  socket?: Socket
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCodemirrorValue?: (value: string) => void
}

const getLocalStorageRoomKey = (roomId: string) => `room_doc_${roomId}`

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  activeFile,
  isReadOnly: _isReadOnly = false,
  mode = EditorMode.Owner,
  withFileManager = true,
  roomId,
  socket,
  isMultipleExtensionFiles = false,
  defaultFileName = 'index.html',
  preloadedCode,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
  onChangeStreamingDocInfo: onChangeStreamingDocInfoFromProps,
  ...collabProps
}) => {
  const { query } = useRouter()
  const dispatch = useDispatch()
  const { user } = useAuthContext()

  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)
  const prevLessonCode = useSelector((state) => state.codePanelGlobal.prevLessonCode)

  const localstorageCode = useMemo(() => {
    if (mode === EditorMode.Owner) {
      const json = localStorage.getItem(
        getLocalStorageRoomKey(prevLessonId || `${user?.student_profile?.id}_${query?.lessonId}`)
      )
      if (json) {
        try {
          const docInfo = JSON.parse(json) as Record<string, string>
          const code = prevLessonCode ?? (docInfo?.htmlBody as unknown as string[])?.join('')
          if (code) {
            return code
          }
        } catch (e) {}
      }
    }
  }, [mode, query?.lessonId, prevLessonId, preloadedCode])

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    void updateCommentWidgetPosition()
  }

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    onChangeStreamingDocInfoFromProps?.(doc)
    localStorage.setItem(getLocalStorageRoomKey(roomId), JSON.stringify(doc))
  }

  const {
    editorRef,
    isLoading,
    extensions,
    streamingDoc,
    key,
    onCreateEditor,
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
    onChangeStreamingDocInfo,
    preloadedCode: localstorageCode ?? preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
  })

  const isReadOnly = _isReadOnly

  useEffect(() => {
    return () => {
      dispatch(setPrevLessonId(null))
      dispatch(setPrevLessonCode(null))
    }
  }, [])

  if (!activeFile) return null

  return (
    <CodeEditorBlockWrapper
      className='code-editor-wrappe'
      ref={editorRef}
    >
      {isLoading || collabProps.isFetching || !streamingDoc ? (
        <LoadingCodeEditor />
      ) : (
        <>
          <CodeMirror
            onContextMenu={onContextMenu}
            onCreateEditor={onCreateEditor}
            key={key}
            className={className}
            height='100%'
            basicSetup={false}
            theme='dark'
            extensions={extensions}
            readOnly={isReadOnly}
            value={streamingDoc.toString() ?? preloadedCode}
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

          <ColabContextMenu
            onAddComment={onAddComment}
            isAddCommentOpen={isAddCommentOpen}
            setIsAddCommentOpen={setIsAddCommentOpen}
            position={position}
          />
        </>
      )}
    </CodeEditorBlockWrapper>
  )
}

export default memo(CodeEditorCollab)
