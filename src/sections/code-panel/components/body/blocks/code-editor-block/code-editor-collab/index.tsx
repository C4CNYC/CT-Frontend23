import { type FC, memo, useContext, useEffect, useMemo, useState } from 'react'

import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/router'
import { Socket } from 'socket.io-client'

import { useDispatch, useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { setCode } from '@root/src/redux/slices/code-panel-global'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import StatusLabel, { RoomStatus } from './components/status-label'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { BASIC_SETUP, EditorMode } from './hook/constants'
import { useFileManager } from './hook/file-manager'
import { docBuilder } from './hook/utils/doc-builder'
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

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  roomId,
  className,
  portalSocket,
  withFileManager = true,
  mode = EditorMode.Owner,
  defaultFileName = 'index.html',
  isReadOnly: _isReadOnly = false,
  isMultipleExtensionFiles = false,
  onChangeStreamingDocInfo: onChangeStreamingDocInfoFromProps,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
  ...collabProps
}) => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const { user } = useAuthContext()
  const codePanelContext = useContext(CodePanelContext)

  const [codeValue, setCodeValue] = useState<string | undefined>('')

  const rootSocket = useSelector((state) => state.codePanelGlobal.socket)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  // Given the fact that we use the same editor block for portals and root editor
  // we are spliting the socket logic here
  const socket = portalSocket || rootSocket

  const { changeLessonStatus } = useSocketController(socket)

  const {
    files,
    isOpen,
    barFiles,
    activeFile,
    preloadedCode,
    isFileControllerAvailable,

    onAddFile,
    setIsOpen,
    onCloseFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile,
  } = useFileManager()

  const { editorRef, extensions, streamingDoc, setStreamingDoc, key, onCreateEditor, roomStatus } =
    useCodeEditorCollab({
      ...collabProps,
      mode,
      roomId,
      socket,
      activeFile,
      preloadedCode,
      defaultFileName,
      cursorText: user?.first_name,
      onChangeStreamingDocInfo: (doc: Record<string, string>) => {
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
      },
    })

  const isEditorReadOnly = useMemo(
    () => _isReadOnly || roomStatus === RoomStatus.Inactive,
    [_isReadOnly, roomStatus]
  )

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    codePanelContext.studentCodeChange(value)
    onChangeStreamingDocInfoFromProps?.(docBuilder(files, activeFile, value))
    dispatch(
      setCode(
        Object.values(docBuilder(files, activeFile, value)).reduce((acc, curr) => acc + curr, '')
      )
    )

    if (value) {
      console.log('isFileControllerAvailable', value.length, activeFile?.id )
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
    }
  }

  useEffect(() => {
    if (preloadedCode) onChangeCodemirrorValue(preloadedCode || '')
  }, [preloadedCode])

  useEffect(() => {
    const newCodeValue =
      preloadedCode ??
      (streamingDoc && streamingDoc.toString().length ? streamingDoc?.toString() : preloadedCode)

    setCodeValue(newCodeValue)
  }, [preloadedCode, streamingDoc])

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
          />

          <FileSwitcher
            fileList={barFiles}
            activeFile={activeFile}
            closeTab={onCloseFile}
            onChange={setActiveFile}
          />
        </>
      )}

      <StatusLabel status={roomStatus} />

      <CodeMirror
        key={key}
        theme='dark'
        height='100%'
        value={codeValue}
        className={className}
        extensions={extensions}
        basicSetup={BASIC_SETUP}
        readOnly={isEditorReadOnly}
        onCreateEditor={onCreateEditor}
        onChange={onChangeCodemirrorValue}
      />
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
