import {
  type RefObject,
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";
import { Socket } from "socket.io-client";
import { type Extension, Compartment } from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";

import { getDocument, getFileInfo } from "./utils/peer-extension";
import { getExtensions } from "./utils/extensions";
import {
  unsubscribeSocket,
  EmitSocketEvents,
  SubscribedEvents
} from "./utils/socket"
import { type MemoizedProps, useMemoizedProps } from "./useMemoizedProps";
import { EditorMode } from "./constants";

// @params
// preloadedCode - strict preloaded code from api
// code - it is a code which was changed by user and saved in local storage to show preview
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

  // refs for listeners
  const editorRef = useRef<HTMLDivElement | null>(null);
	const editorView = useRef<EditorView | null>(null);
	const lineWrapRef = useRef<Compartment | null>(null);

  const {
    cursorText,
    withTooltip,
    onChange,
    setActiveFile,
    onResetFileManager
  } = useMemoizedProps(propsToMemoize)

  useEffect(() => {
    firstInit.current = true;
    modeRef.current = mode;
  }, [mode]);

  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const [doc, setDoc] = useState('');

  const clearSocketData = useCallback(() => {
    if (initRoomDataRef.current.mode === EditorMode.Owner) {
      socketRef.current?.emit(EmitSocketEvents.DeleteRoom, initRoomDataRef.current.roomId);
    }

    unsubscribeSocket(socketRef.current);
    editorView.current?.destroy();
  }, []);

  // initialize code mirror collab
  const runInitialize = useCallback(async (isFirstInit: boolean) => {
    editorView.current?.destroy();
    firstInit.current = false;
    lineWrapRef.current = new Compartment();

    let _activeFile = activeFile;

    if (modeRef.current === EditorMode.Owner && isFirstInit) {
      const fileInfo = await getFileInfo(roomId, socketRef.current);
      if (fileInfo != null) {
         onResetFileManager(fileInfo);

        if (fileInfo.activeFile === activeFile) {
          await runInitialize(false)
        }
        
        return;
      }
    }

    if (modeRef.current === EditorMode.Watcher) {
      const fileInfo = await getFileInfo(roomId, socketRef.current);

      if (fileInfo != null) {
        const { activeFile: file } = fileInfo
        if (file != null && file !== activeFile) {
          setActiveFile(file);
          return;
        }
  
        _activeFile = file ?? activeFile;
  
        socketRef.current.on(SubscribedEvents.ActiveFileChanged, (_roomId: string, fileName: string) => {
          if (_roomId === roomId) {
            setActiveFile(fileName);
          }
        })
      }
    }

    if (modeRef.current === EditorMode.SubOwner && isFirstInit) {
      const fileInfo = await getFileInfo(roomId, socketRef.current);

      onResetFileManager(fileInfo);

      if (fileInfo.activeFile === activeFile) {
        await runInitialize(false);
      }

      return;
    }

    // get init data from server
    const { version, doc, cursorName } = await getDocument({
      socket: socketRef.current,
      roomId,
      cursorName: cursorText,
      fileName: _activeFile,
    });

    const extensions = getExtensions({
      socket: socketRef.current,
      lineWrap: lineWrapRef.current,
      withTooltip: withTooltip,
      tooltipText: cursorText,
      fileName: _activeFile,
      cursorId: cursorName,
      onChange,
      version,
      roomId,
    });

    setExtensions(extensions);
    setDoc(doc.toString());
    setKey((prev) => ++prev);
    setIsLoading(false);
  }, [
    activeFile,
    roomId,
    cursorText,
    setActiveFile,
    onResetFileManager
  ]);

  const onCreateEditor = (view: EditorView) => {
    editorView.current = view
  }

  useEffect(() => {  
    void runInitialize(firstInit.current);
  }, [runInitialize])

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
