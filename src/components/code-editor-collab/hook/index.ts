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

import { File, getFileInfo, isRoomExist } from "./utils/collab/requests";
import {
  unsubscribeSocket,
  EmitSocketEvents,
} from "./utils/socket"
import {
  type MemoizedProps,
  useMemoizedProps
} from "./useMemoizedProps";
import { useInitCodemirror, UseBaseInitReturn } from "./useInitCodemirror";
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

  // ------------------------------------------------------ //
  //                         Handlers                       //
  // ------------------------------------------------------ //

  const onCreateEditor = (view: EditorView) => {
    editorView.current = view
  }

  const clearSocketData = useCallback(() => {
    if (initRoomDataRef.current.mode === EditorMode.Owner) {
      socket.emit(EmitSocketEvents.DeleteRoom, initRoomDataRef.current.roomId);
    }

    unsubscribeSocket(socket);
    editorView.current?.destroy();
  }, []);

  // ------------------------------------------------------ //
  //                     Initialize Base                    //
  // ------------------------------------------------------ //

  const { baseInit, setIsLoading, ...codeMirrorProps } = useInitCodemirror({
    socket,
    withTooltip,
    onChange,
    roomId,
    cursorText,
    defaultFileName
  })

  // ------------------------------------------------------ //
  //                   Initialize SubOwner                  //
  // ------------------------------------------------------ //

  const runInitSubOwner = useCallback(async (isFirstInit: boolean) => {
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
      return await baseInit(activeFile);
    }

    const fileInfo = await getFileInfo(roomId, socket);

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile === activeFile) {
      await runInitSubOwner(false);
    }
  }, [activeFile, baseInit, onResetFileManager, socket]);

  // ------------------------------------------------------ //
  //                   Initialize Owner                     //
  // ------------------------------------------------------ //

  const runInitOwner = useCallback(async (isFirstInit: boolean) => {
    firstInit.current = false;
    setRoomStatus(RoomStatus.Active);

    const fileInfo = await getFileInfo(roomId, socket);

    console.log(activeFile);
    if (!isFirstInit || fileInfo == null) {
      return await baseInit(activeFile)
    }

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile.id === activeFile.id) {
      await runInitOwner(false)
    }
  }, [activeFile, baseInit, onResetFileManager, socket]);

  // ------------------------------------------------------ //
  //                   Initialize Watcher                   //
  // ------------------------------------------------------ //

  const runInitWatcher = useCallback(async () => {
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
    const fileInfo = await getFileInfo(roomId, socket);

    if (fileInfo != null) {
      const shouldChangeFile = fileInfo.activeFile != null &&
        fileInfo.activeFile.id !== activeFile.id;

      if (shouldChangeFile) {
        setActiveFile(fileInfo.activeFile);
        return;
      }

      _activeFile = fileInfo.activeFile ?? activeFile;
    }

    await baseInit(_activeFile);
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

  // ------------------------------------------------------ //
  //                       Effects                          //
  // ------------------------------------------------------ //

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
