import { type FC, memo, useContext, useEffect, useState } from 'react'

import { Text } from '@codemirror/state'
// import { Box, ClickAwayListener, Popover } from '@mui/material'
import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

import { useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'
import { RELOAD_WORKSPACE_EVENT } from '@root/src/sections/code-panel/lib/events'

// import AddComment from './components/add-comment'
// import CommentPopup from './components/comment-popup'
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
const DEBOUNCE_SAVE_TIME = 400
let checkValueTimeout: any | null = null
let checkSaveTimeout: any | null = null
const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  roomId,
  className,
  portalSocket,
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
  const codePanelContext = useContext(CodePanelContext)

  const [, setRefreshKey] = useState(0)
  const [codeValue, setCodeValue] = useState<string | undefined>('')

  const rootSocket = useSelector((state) => state.codePanelGlobal.socket)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  // Given the fact that we use the same editor block for portals and root editor
  // we are spliting the socket logic here
  const socket = portalSocket || rootSocket

  const { changeLessonStatus } = useSocketController(socket)

  const {
    files,
    isOpen,
    barFiles,
    activeFile,
    isFileLoading,
    preloadedCode,
    isFileControllerAvailable,

    onAddFile,
    setIsOpen,
    onCloseFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile,
  } = useFileManager()

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    if (!doc.htmlBody?.[0]?.length && !doc.jsBody?.[0]?.length && !doc.cssBody?.[0]?.length) {
      return
    }

    if (lessonId && user) changeLessonStatus(lessonId)
    if (checkValueTimeout) clearTimeout(checkValueTimeout)

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
      if (isFileControllerAvailable && activeFile?.body !== value) {
        if (checkSaveTimeout) clearTimeout(checkSaveTimeout)

        checkSaveTimeout = setTimeout(
          (previousLength: number) => {
            if (value.length !== previousLength) {
              onUpdateFile(activeFile?.id as string, {
                body: value,
              })
            }
          },
          DEBOUNCE_SAVE_TIME,
          activeFile?.body?.length
        )

        return
      }

      const localStorageKey = getLocalStorageRoomKey(
        `${lessonId}${query?.lessonId}${activeFile?.id}${slideIndex}`
      )
      localStorage.setItem(localStorageKey, value)
    }

    void updateCommentWidgetPosition()
  }

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
      // isAddCommentDisabled,
      // isAddCommentOpen,
      // position,
      // setIsAddCommentOpen,
      // onAddComment,
      // isCommentPopupOpen,
      // commentPopupProps,
      // onCloseCommentPopup,
      // onRemoveComment,
      // onRemoveCommentGroup,
      updateCommentWidgetPosition,
    },
  } = useCodeEditorCollab({
    ...collabProps,
    onChangeStreamingDocInfo,
    preloadedCode: preloadedCode,
    activeFile,
    mode,
    socket,
    roomId,
    defaultFileName,
    cursorText: user?.first_name,
  })

  useEffect(() => {
    onChangeCodemirrorValue(preloadedCode || '')
  }, [preloadedCode])

  useEffect(() => {
    const newCodeValue =
      preloadedCode ??
      (streamingDoc && streamingDoc.toString().length ? streamingDoc?.toString() : preloadedCode)

    setCodeValue(newCodeValue)
  }, [preloadedCode, streamingDoc])

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

  useEffect(() => {
    window.addEventListener(RELOAD_WORKSPACE_EVENT, () => {
      setRefreshKey((prev) => prev + 1)
    })
  }, [])

  return (
    <div
      className={`${styles.wrapper} code-editor-wrapper`}
      ref={editorRef}
    >
      {withFileManager && (
        <>
          <FileModal
            mode={mode}
            files={files}
            isOpen={isOpen}
            isFileControllerAvailable={isFileControllerAvailable}
            setIsOpen={setIsOpen}
            onAddFile={onAddFile}
            onDeleteFile={onDeleteFile}
            setActiveFile={setActiveFile}
            isMultipleExtensionFiles={isMultipleExtensionFiles}
          />

          <FileSwitcher
            activeFile={activeFile}
            onChange={setActiveFile}
            closeTab={onCloseFile}
            fileList={barFiles}
          />
        </>
      )}

      <StatusLabel status={roomStatus} />

      {!isFileLoading ? (
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

          {/* <CommentPopup
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
          </Popover> */}
        </>
      ) : null}
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
