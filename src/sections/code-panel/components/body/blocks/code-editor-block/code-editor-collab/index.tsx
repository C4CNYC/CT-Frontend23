import { type FC, memo, useContext, useEffect, useMemo, useState } from 'react'

import { Text } from '@codemirror/state'
import CodeMirror from '@uiw/react-codemirror'
import { useRouter } from 'next/router'
import { Socket } from 'socket.io-client'

import { useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'
import { useAuthContext } from '@root/src/auth/useAuthContext'
import { StudentFile } from '@root/src/redux/services/interfaces/workspace.interface'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'
import { RELOAD_WORKSPACE_EVENT } from '@root/src/sections/code-panel/lib/events'

import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import StatusLabel, { RoomStatus } from './components/status-label'
import { type UseCodeEditorCollabProps, useCodeEditorCollab } from './hook'
import { BASIC_SETUP, EditorMode } from './hook/constants'
import { DEFAULT_FILE_ID, useFileManager } from './hook/file-manager'
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
  const { query } = useRouter()
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
  }

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
            isMultipleExtensionFiles={isMultipleExtensionFiles}
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

      {!isFileLoading ? (
        <>
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
        </>
      ) : null}
    </div>
  )
}

const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

const docBuilder = (files: StudentFile[], activeFile: StudentFile, value: string) => {
  if (activeFile?.id === DEFAULT_FILE_ID) {
    return {
      htmlBody: value,
      cssBody: '',
      jsBody: '',
    }
  }
  // TODO: Update this logic in next iteration
  const doc = {
    htmlBody: files
      .filter((file) => file.extension === 'html')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
    cssBody: files
      .filter((file) => file.extension === 'css')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
    jsBody: files
      .filter((file) => file.extension === 'js')
      .map((file) => file)
      .map((file) => (file.id === activeFile?.id ? value : file.body))
      .join(' '),
  }

  return doc
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
