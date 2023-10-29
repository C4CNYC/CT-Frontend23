import {
  type RefObject,
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";
import { Socket, io } from "socket.io-client";
import { type Extension, Compartment } from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";

import { getActiveFile, getDocument } from "./utils/peer-extension";
import { getExtensions } from "./utils/extensions";

export enum EditorMode {
  Student = "student",
  Watcher = "watcher",
  Teacher = "teacher"
}

// @params
// preloadedCode - strict preloaded code from api
// code - it is a code which was changed by user and saved in local storage to show preview
export interface UseCodeEditorCollabProps {
  roomId: string
	cursorText?: string
	withTooltip?: boolean
	onChange?: (code: string) => void
  code?: string
	preloadedCode?: string
  mode?: EditorMode
  activeFile: string
  onDeleteFile: (fileName: string) => string | null
  setActiveFile: (fileName: string) => void
}

interface UseCodeEditorCollabReturn {
  extensions?: Extension[]
  editorRef: RefObject<HTMLDivElement>
  isLoading: boolean
  activeFile: string
  key: number
  doc: string
  onDeleteFile: (fileName: string) => void
  onChangeActiveFile: (fileName: string) => void
}

const createSocket = (): Socket => {
	return io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
    path: "/api",
  });
}

export const useCodeEditorCollab = ({
	roomId,
	cursorText = 'Unknown',
	withTooltip = true,
	onChange,
	preloadedCode = "",
  code = "",
  mode = EditorMode.Student,
  activeFile,
  onDeleteFile: _onDeleteFile,
  setActiveFile
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const socketRef = useRef<Socket | null>(null);

  // refs for listeners
  const editorRef = useRef<HTMLDivElement | null>(null);
	const editorView = useRef<EditorView | null>(null);
	const lineWrapRef = useRef<Compartment | null>(null);

  // memoized props
  const cursorTextRef = useRef<string>(cursorText);
	const withTooltipRef = useRef(withTooltip);
	const roomIdRef = useRef(roomId);
  const modeRef = useRef(mode);
	const onChangeRef = useRef(onChange);
	const preloadedCodeRef = useRef(preloadedCode);
  const codeRef = useRef(code);
  const firstInit = useRef(true)

  // state
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const [doc, setDoc] = useState('');

  const unsibscribeSocket = useCallback(() => {
    socketRef.current?.off('pullUpdateResponse');
    socketRef.current?.off('pushUpdateResponse');
    socketRef.current?.off('getDocumentResponse');
    socketRef.current?.off('activeFileChanged');
  }, [])

  // initialize code mirror collab
  const runInitialize = useCallback(async (isFirstInit: boolean) => {
    unsibscribeSocket()
    socketRef.current = createSocket();
    firstInit.current = false
    lineWrapRef.current = new Compartment();
    socketRef.current.open();

    const defaultCode = codeRef.current || preloadedCodeRef.current;
    const isPreloadedCodeExist = modeRef.current !== EditorMode.Watcher &&
      defaultCode !== "" &&
      defaultCode !== null;
    const isShouldPreloadCode = isPreloadedCodeExist && isFirstInit;
    const preloadedCode = isShouldPreloadCode ? defaultCode : undefined

    let _activeFile = activeFile;

    if (modeRef.current === EditorMode.Watcher && roomIdRef.current != null) {
      const file = await getActiveFile(roomIdRef.current ?? '', socketRef.current);
      _activeFile = file ?? activeFile;

      socketRef.current.on('activeFileChanged', (roomId: string, fileName: string) => {
        if (roomId === roomIdRef.current) {
          setActiveFile(fileName);
        }
      })
    }

    // get init data from server
    const { version, doc, cursorName } = await getDocument({
      socket: socketRef.current,
      roomId: roomIdRef.current,
      cursorName: cursorTextRef.current,
      fileName: _activeFile,
      preloadedCode
    });

    // initialize extensions according to getting data from server
    const extensions = getExtensions({
      socket: socketRef.current,
      lineWrap: lineWrapRef.current,
      withTooltip: withTooltipRef.current,
      tooltipText: cursorTextRef.current,
      fileName: _activeFile,
      cursorId: cursorName,
      onChange: onChangeRef.current,
      version,
      roomId
    });

    setExtensions(extensions);
    setDoc(doc.toString());
    setKey((prev) => ++prev);
    setIsLoading(false);
  }, [activeFile, unsibscribeSocket]);

  const onChangeActiveFile = (fileName: string) => {
    setActiveFile(fileName);
    socketRef.current?.emit("setActiveFile", roomIdRef.current, fileName);
  }

  const onDeleteFile = (fileName: string) => {
    const newActiveFile = _onDeleteFile(fileName);
    socketRef.current?.emit("setActiveFile", roomIdRef.current, newActiveFile);
    socketRef.current?.emit('deleteFile', roomId, fileName)
  }

  useEffect(() => {
    void runInitialize(firstInit.current)
  }, [runInitialize])

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		return () => {
      if (modeRef.current === EditorMode.Student) {
        socketRef.current?.emit("deleteRoom", roomIdRef.current)
      }

      unsibscribeSocket()
      editorView.current?.destroy();
		}
	}, [unsibscribeSocket]);

  return {
    editorRef,
    activeFile,
    extensions,
    doc,
    key,
    isLoading,
    onDeleteFile,
    onChangeActiveFile
  }
}
