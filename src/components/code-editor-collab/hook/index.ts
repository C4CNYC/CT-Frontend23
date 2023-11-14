import {
  type RefObject,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from "react";
import { type Extension, Compartment } from '@uiw/react-codemirror';
import { Socket } from "socket.io-client";
import { EditorView } from "@codemirror/view";

import { getDocument, getFileInfo } from "./utils/peer-extension";
import { getExtensions } from "./utils/extensions";
import {
  unsubscribeSocket,
  EmitSocketEvents,
  SubscribedEvents
} from "./utils/socket"
import {
  type MemoizedProps,
  useMemoizedProps
} from "./useMemoizedProps";
import { EditorMode } from "./constants";

export interface UseCodeEditorCollabProps extends MemoizedProps {
  roomId: string
  mode?: EditorMode
  activeFile: string
  socket: Socket
}

interface UseCodeEditorCollabReturn {
  extensions?: Extension[]
  editorRef: RefObject<HTMLDivElement>
  isLoading: boolean
  activeFile: string
  key: number
  doc: string
  onCreateEditor: (view: EditorView) => void
}

export const useCodeEditorCollab = ({
	roomId,
  mode = EditorMode.Owner,
  activeFile,
  socket,
  ...propsToMemoize
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const modeRef = useRef(mode);
  const firstInit = useRef(true);
  const socketRef = useRef<Socket>(socket);
  const initRoomDataRef = useRef({ mode, roomId });
  const editorView = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
	const lineWrapRef = useRef<Compartment | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const [doc, setDoc] = useState('');

  const {
    cursorText,
    withTooltip,
    onChange,
    setActiveFile,
    onResetFileManager
  } = useMemoizedProps(propsToMemoize);

  // ------------------------------------------------------ //
  //                         Handlers                       //
  // ------------------------------------------------------ //

  const onCreateEditor = (view: EditorView) => {
    editorView.current = view
  }

  const clearSocketData = useCallback(() => {
    if (initRoomDataRef.current.mode === EditorMode.Owner) {
      socketRef.current?.emit(EmitSocketEvents.DeleteRoom, initRoomDataRef.current.roomId);
    }

    unsubscribeSocket(socketRef.current);
    editorView.current?.destroy();
  }, []);

  // ------------------------------------------------------ //
  //                     Initialize Base                    //
  // ------------------------------------------------------ //

  const baseInit = useCallback(async (fileName: string) => {
    lineWrapRef.current = new Compartment();

    const { version, doc, cursorName } = await getDocument({
      roomId,
      fileName,
      socket: socketRef.current,
      cursorName: cursorText,
    });

    const extensions = getExtensions({
      socket: socketRef.current,
      lineWrap: lineWrapRef.current,
      tooltipText: cursorText,
      cursorId: cursorName,
      withTooltip,
      fileName,
      onChange,
      version,
      roomId,
    });

    setExtensions(extensions);
    setDoc(doc.toString());
    setKey((prev) => ++prev);
    setIsLoading(false);
  }, [roomId, cursorText, onChange, withTooltip]);

  // ------------------------------------------------------ //
  //                   Initialize SubOwner                  //
  // ------------------------------------------------------ //

  const runInitSubOwner = useCallback(async (isFirstInit: boolean) => {
    firstInit.current = false;

    if (!isFirstInit) {
      return await baseInit(activeFile);
    }

    const fileInfo = await getFileInfo(roomId, socketRef.current);

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile === activeFile) {
      await runInitSubOwner(false);
    }
  }, [activeFile, baseInit, onResetFileManager]);

  // ------------------------------------------------------ //
  //                   Initialize Owner                     //
  // ------------------------------------------------------ //

  const runInitOwner = useCallback(async (isFirstInit: boolean) => {
    firstInit.current = false;

    const fileInfo = await getFileInfo(roomId, socketRef.current);

    if (!isFirstInit || fileInfo == null) {
      return await baseInit(activeFile)
    }

    onResetFileManager(fileInfo);

    if (fileInfo.activeFile === activeFile) {
      await runInitOwner(false)
    }
  }, [activeFile, baseInit, onResetFileManager]);

  // ------------------------------------------------------ //
  //                   Initialize Watcher                   //
  // ------------------------------------------------------ //

  const runInitWatcher = useCallback(async () => {
    firstInit.current = false;

    let _activeFile = activeFile;
    const fileInfo = await getFileInfo(roomId, socketRef.current);

    if (fileInfo != null) {
      const shouldChangeFile = fileInfo.activeFile != null &&
        fileInfo.activeFile !== activeFile;

      if (shouldChangeFile) {
        setActiveFile(fileInfo.activeFile);
        return;
      }

      _activeFile = fileInfo.activeFile ?? activeFile;

      socketRef.current.on(
        SubscribedEvents.ActiveFileChanged,
        (_roomId: string, fileName: string) => {
          if (_roomId === roomId) {
            setActiveFile(fileName);
          }
        }
      )
    }

    await baseInit(_activeFile);
  }, [activeFile, baseInit, setActiveFile]);

  const initialize = useMemo(() => ({
    [EditorMode.Owner]: runInitOwner,
    [EditorMode.SubOwner]: runInitSubOwner,
    [EditorMode.Watcher]: runInitWatcher,
  }), [runInitWatcher, runInitOwner, runInitSubOwner]);

  // ------------------------------------------------------ //
  //                       Effects                          //
  // ------------------------------------------------------ //

  useEffect(() => {
    firstInit.current = true;
    modeRef.current = mode;
  }, [mode, roomId]);

  useEffect(() => {
    editorView.current?.destroy();
    initialize[modeRef.current](firstInit.current);
  }, [initialize]);

	useEffect(() => {
    window.addEventListener('beforeunload', clearSocketData);
		return () => clearSocketData();
	}, [clearSocketData]);

  return {
    editorRef,
    activeFile,
    extensions,
    doc,
    key,
    isLoading,
    onCreateEditor
  }
}
