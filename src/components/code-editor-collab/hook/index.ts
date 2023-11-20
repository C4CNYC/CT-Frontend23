import {
  type RefObject,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react";
import { type Extension } from '@uiw/react-codemirror';
import { Socket } from "socket.io-client";
import { EditorView } from "@codemirror/view";

import { type File, getFileInfo, isRoomExist } from "./utils/collab/requests";
import { type MemoizedProps, useMemoizedProps } from "./useMemoizedProps";
import { useInitCodemirror, UseBaseInitReturn } from "./useInitCodemirror";
import { unsubscribeSocket, EmitSocketEvents } from "./utils/socket"
import { useModeSubscriptions } from "./useModeSubscriotions";
import { EditorMode } from "./constants";
import { RoomStatus } from "../components/status-label";

export interface UseCodeEditorCollabProps extends MemoizedProps {
  roomId: string
  mode?: EditorMode
  activeFile: File
  socket: Socket
  onRoomStatusChanged?: (roomStatus: RoomStatus) => void
}

interface UseCodeEditorCollabReturn extends Omit<UseBaseInitReturn, 'baseInit' | 'setIsLoading'> {
  extensions?: Extension[]
  editorRef: RefObject<HTMLDivElement>
  isLoading: boolean
  key: number
  doc: string
  onCreateEditor: (view: EditorView) => void
  roomStatus: RoomStatus
}

export const useCodeEditorCollab = ({
	roomId,
  mode = EditorMode.Owner,
  activeFile,
  socket,
  onRoomStatusChanged,
  ...propsToMemoize
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const modeRef = useRef(mode);
  const firstInit = useRef(true);
  const initializeBlockedRef = useRef(false);
  const initRoomDataRef = useRef({ mode, roomId });
  const editorView = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [roomStatus, setRoomStatus] = useState(RoomStatus.Active);

  const {
    cursorText,
    withTooltip,
    onChange,
    setActiveFile,
    onResetFileManager,
    defaultFileName
  } = useMemoizedProps(propsToMemoize);

  const onCreateEditor = (view: EditorView): void => {
    editorView.current = view
  }

  const clearSocketData = useCallback((): void => {
    if (initRoomDataRef.current.mode === EditorMode.Owner) {
      socket.emit(EmitSocketEvents.DeleteRoom, initRoomDataRef.current.roomId);
    }

    unsubscribeSocket(socket);
    editorView.current?.destroy();
  }, []);

  const { baseInit, setIsLoading, ...codeMirrorProps } = useInitCodemirror({
    socket,
    withTooltip,
    onChange,
    roomId,
    cursorText,
    defaultFileName
  })

  const runInitSubOwner = useCallback(async (isFirstInit: boolean): Promise<void> => {
    firstInit.current = false;
    const isRoom = await isRoomExist(roomId, socket);

    if (!isRoom) {
      initializeBlockedRef.current = true;
      onResetFileManager();
      setRoomStatus(RoomStatus.Inactive);
      setIsLoading(false);
      return;
    }

    setRoomStatus(RoomStatus.Active);

    if (!isFirstInit) {
      return await baseInit(activeFile, modeRef.current);
    }

    const fileInfo = await getFileInfo(roomId, socket, modeRef.current);

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile === activeFile) {
      await runInitSubOwner(false);
    }
  }, [activeFile, baseInit, onResetFileManager, socket]);

  const runInitOwner = useCallback(async (isFirstInit: boolean) => {
    firstInit.current = false;
    setRoomStatus(RoomStatus.Active);

    console.log(`run init. Role - ${modeRef.current}, roomId-${roomId}
    
    `);
    const fileInfo = await getFileInfo(roomId, socket, modeRef.current);

    if (!isFirstInit || fileInfo == null) {
      console.log(`before base init. Role - ${modeRef.current}, roomId-${roomId}
      
      `);
      return await baseInit(activeFile,  modeRef.current)
    }

    console.log(`base init skipped, file info is exist. Setting file info to file maneger. Role - ${modeRef.current}, roomId-${roomId}

    `);

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile.id === activeFile.id) {
      await runInitOwner(false)
    }
  }, [activeFile, baseInit, onResetFileManager, socket]);

  const runInitWatcher = useCallback(async (): Promise<void> => {
    firstInit.current = false;
    const isRoom = await isRoomExist(roomId, socket);

    if (!isRoom) {
      initializeBlockedRef.current = true;
      onResetFileManager();
      setIsLoading(false);
      setRoomStatus(RoomStatus.Inactive);
      return;
    }

    setRoomStatus(RoomStatus.Active);

    let _activeFile = activeFile;
    const fileInfo = await getFileInfo(roomId, socket, modeRef.current);

    if (fileInfo != null) {
      const shouldChangeFile = fileInfo.activeFile != null &&
        fileInfo.activeFile.id !== activeFile.id;

      if (shouldChangeFile) {
        onResetFileManager(fileInfo);
        return;
      }

      _activeFile = fileInfo.activeFile ?? activeFile;
    }

    await baseInit(_activeFile, modeRef.current);
  }, [activeFile, baseInit, setActiveFile, socket]);

  const initialize = useMemo(() => ({
    [EditorMode.Owner]: runInitOwner,
    [EditorMode.SubOwner]: runInitSubOwner,
    [EditorMode.Watcher]: runInitWatcher,
  }), [runInitWatcher, runInitOwner, runInitSubOwner]);

  useModeSubscriptions({
    roomId,
    roomStatus,
    initializeBlockedRef,
    runInitSubOwner,
    runInitWatcher,
    mode,
    socket,
    onChange
  })

  useEffect(() => {
    onRoomStatusChanged?.(roomStatus)
  }, [roomStatus, onRoomStatusChanged])

  useEffect(() => {
    initializeBlockedRef.current = false;
    firstInit.current = true;
    modeRef.current = mode;
  }, [mode, roomId]);

  useEffect(() => {
    editorView.current?.destroy();

    if (initializeBlockedRef.current) {
      return;
    }

    initialize[modeRef.current](firstInit.current);
  }, [initialize]);

	useEffect(() => {
    window.addEventListener('beforeunload', clearSocketData);
		return () => clearSocketData();
	}, [clearSocketData]);

  return {
    editorRef,
    onCreateEditor,
    roomStatus,
    ...codeMirrorProps,
  }
}
