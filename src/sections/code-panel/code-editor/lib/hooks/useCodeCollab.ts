import { type RefObject, useEffect, useState, useRef, useCallback, useMemo } from 'react'

import { EditorView } from '@codemirror/view'
import type { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'

import { EmitSocketEvents } from '../../../lib/utils/socket'
import { RoomStatus } from '../../status-label'
import { type File, getFileInfo, isRoomExist } from '../utils/requests'

import { EditorMode } from './constants'
import { useCodemirrorInit, UseCodemirrorInitReturn } from './useCodemirrorInit'
import { type UseCommentsPropsReturn, useComments } from './useComments'
import { type MemoizedProps, useMemoizedProps } from './useMemoizedProps'
import { useModeSubscriptions } from './useModeSubscriptions'

export interface UseCodeEditorProps extends MemoizedProps {
  roomId: string
  mode?: EditorMode
  user?: AuthUserType
  activeFile: File
  socket?: Socket
  onRoomStatusChanged?: (roomStatus: RoomStatus) => void
}

interface UseCodeCollabReturn {
  editorRef: RefObject<HTMLDivElement>
  onCreateEditor: (view: EditorView) => void
  roomStatus: RoomStatus
  commentProps: Omit<UseCommentsPropsReturn, 'commentEffectRef' | 'onCommentIconClick'>
  codeMirror: UseCodemirrorInitReturn
}

export const useCodeCollab = ({
  roomId,
  mode = EditorMode.Owner,
  activeFile,
  socket,
  onRoomStatusChanged,
  user,

  // code,
  // preloadedCode,
  // defaultFileName,
  // onChangeStreamingDocInfo,
  // onResetFileManager,
  // setActiveFile,
  // cursorText,
  // withTooltip,
  // isFetching
  ...propsToMemoize
}: UseCodeEditorProps): UseCodeCollabReturn => {
  const modeRef = useRef(mode)
  const firstInit = useRef(true)
  const initializationBlockedRef = useRef(false)
  const editorView = useRef<EditorView | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [roomStatus, setRoomStatus] = useState(RoomStatus.Active)

  const {
    cursorText,
    withTooltip,
    onChangeStreamingDocInfo,
    setActiveFile,
    onResetFileManager,
    defaultFileName,
    preloadedCode,
  } = useMemoizedProps(propsToMemoize)

  const onCreateEditor = (view: EditorView): void => {
    editorView.current = view
  }

  const { commentEffectRef, onCommentIconClick, ...commentProps } = useComments({
    editorView,
    socket,
    cursorText,
    roomId,
    activeFile: activeFile.id,
  })

  const codeMirror = useCodemirrorInit({
    socket,
    withTooltip,
    onChangeStreamingDocInfo,
    roomId,
    user,
    cursorText,
    defaultFileName,
    preloadedCode,
    commentEffectRef,
    onCommentIconClick,
  })

  const { init: codemirrorInit, setIsInitializing: setCodemirrorIsInitializing } = codeMirror

  const runInitSubOwner = useCallback(
    async (isFirstInit: boolean): Promise<void> => {
      if (!socket) return

      firstInit.current = false
      const isRoom = await isRoomExist(roomId, socket)

      if (!isRoom) {
        initializationBlockedRef.current = true
        onResetFileManager()
        setRoomStatus(RoomStatus.Inactive)
        setCodemirrorIsInitializing(false)
        return
      }

      setRoomStatus(RoomStatus.Active)

      if (!isFirstInit) {
        await codemirrorInit(activeFile)
        return
      }

      const fileInfo = await getFileInfo(roomId, socket)

      onResetFileManager(fileInfo)

      if (fileInfo.activeFile === activeFile) {
        await runInitSubOwner(false)
      }
    },
    [activeFile, codemirrorInit, onResetFileManager, socket]
  )

  const runInitOwner = useCallback(
    async (isFirstInit: boolean): Promise<void> => {
      if (!socket) return

      firstInit.current = false
      setRoomStatus(RoomStatus.Active)

      const fileInfo = await getFileInfo(roomId, socket)

      if (!isFirstInit || fileInfo == null) {
        await codemirrorInit(activeFile)
        return
      }

      onResetFileManager(fileInfo)

      if (fileInfo.activeFile.id === activeFile.id) {
        await runInitOwner(false)
      }
    },
    [activeFile, codemirrorInit, onResetFileManager, socket]
  )

  const runInitWatcher = useCallback(async (): Promise<void> => {
    if (!socket) return

    firstInit.current = false
    const isRoom = await isRoomExist(roomId, socket)

    if (!isRoom) {
      initializationBlockedRef.current = true
      onResetFileManager()
      setCodemirrorIsInitializing(false)
      setRoomStatus(RoomStatus.Inactive)
      return
    }

    setRoomStatus(RoomStatus.Active)

    let _activeFile = activeFile
    const fileInfo = await getFileInfo(roomId, socket)

    if (fileInfo != null) {
      const shouldChangeFile =
        fileInfo.activeFile != null && fileInfo.activeFile.id !== activeFile.id

      if (shouldChangeFile) {
        onResetFileManager(fileInfo)
        return
      }

      _activeFile = fileInfo.activeFile ?? activeFile
    }

    await codemirrorInit(_activeFile)
  }, [activeFile, codemirrorInit, setActiveFile, socket, onResetFileManager])

  const initialize = useMemo(
    () => ({
      [EditorMode.Owner]: runInitOwner,
      [EditorMode.SubOwner]: runInitSubOwner,
      [EditorMode.Watcher]: runInitWatcher,
    }),
    [runInitWatcher, runInitOwner, runInitSubOwner]
  )

  // useEffect(() => {
  //   const onResetLesson = () => {
  //     editorView.current?.destroy()
  //     if (initializeBlockedRef.current) {
  //       return
  //     }
  //
  //     if (socket) {
  //       initialize[modeRef.current](firstInit.current)
  //     }
  //   }
  //
  //   window.addEventListener(RESET_LESSON_EVENT, onResetLesson)
  //
  //   return () => {
  //     window.removeEventListener(RESET_LESSON_EVENT, onResetLesson)
  //   }
  // }, [socket])

  useModeSubscriptions({
    roomId,
    roomStatus,
    initializeBlockedRef: initializationBlockedRef,
    runInitSubOwner,
    runInitWatcher,
    mode,
    socket,
    onChangeStreamingDocInfo,
  })

  useEffect(() => {
    onRoomStatusChanged?.(roomStatus)
  }, [roomStatus, onRoomStatusChanged])

  useEffect(() => {
    initializationBlockedRef.current = false
    firstInit.current = true
    modeRef.current = mode
  }, [mode, roomId])

  useEffect(() => {
    editorView.current?.destroy()

    if (!socket) {
      setCodemirrorIsInitializing(false)
      return
    }

    if (initializationBlockedRef.current) {
      return
    }

    initialize[modeRef.current](firstInit.current)
  }, [initialize, socket])

  useEffect(() => {
    const currentRoomId = roomId
    const currentMode = mode
    const currentSocket = socket
    const clearRoom = () => {
      if (currentMode === EditorMode.Owner) {
        currentSocket?.emit(EmitSocketEvents.DeleteRoom, currentRoomId)
      }
    }
    window.addEventListener('beforeunload', clearRoom)
    return () => {
      window.removeEventListener('beforeunload', clearRoom)
      clearRoom()
      editorView.current?.destroy()
    }
  }, [socket, roomId, mode])

  // useEffect(() => {
  //   const currentSocket = socket
  //   const clearSocketData = () => {
  //     console.log('clearSocketData')
  //
  //     unsubscribeAllSocketEvents(currentSocket)
  //   }
  //
  //   window.addEventListener('beforeunload', clearSocketData)
  //   return () => {
  //     window.removeEventListener('beforeunload', clearSocketData)
  //     clearSocketData()
  //   }
  // }, [socket])

  return {
    editorRef,
    onCreateEditor,
    roomStatus,
    commentProps,
    codeMirror,
  }
}
