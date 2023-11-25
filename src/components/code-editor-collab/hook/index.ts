import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Compartment, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { Socket } from "socket.io-client";

import { EditorMode } from "./constants";
import { type MemoizedProps, useMemoizedProps } from "./useMemoizedProps";
import { getExtensions } from "./utils/extensions";
import { getDocument, getFileInfo } from "./utils/peer-extension";
import { EmitSocketEvents, SubscribedEvents } from "./utils/socket";

export interface UseCodeEditorCollabProps extends MemoizedProps {
  userId: string;
  roomId: string;
  mode?: EditorMode;
  activeFile: string;
  socket: Socket;
}

interface UseCodeEditorCollabReturn {
  extensions?: Extension[];
  editorRef: RefObject<HTMLDivElement>;
  isLoading: boolean;
  activeFile: string;
  key: number;
  doc: string;
  onCreateEditor: (view: EditorView) => void;
}

export const useCodeEditorCollab = ({
  userId,
  roomId,
  mode = EditorMode.Owner,
  activeFile,
  socket,
  ...propsToMemoize
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const modeRef = useRef(mode);
  const firstInit = useRef(true);
  const initRoomDataRef = useRef({ mode, roomId });
  const editorView = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const lineWrapRef = useRef<Compartment | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const [doc, setDoc] = useState("");

  const {
    cursorText,
    withTooltip,
    onChange,
    setActiveFile,
    onResetFileManager,
  } = useMemoizedProps(propsToMemoize);

  // ------------------------------------------------------ //
  //                         Handlers                       //
  // ------------------------------------------------------ //

  const onCreateEditor = (view: EditorView) => {
    editorView.current = view;
  };

  // ------------------------------------------------------ //
  //                     Initialize Base                    //
  // ------------------------------------------------------ //

  const baseInit = useCallback(
    async (fileName: string) => {
      lineWrapRef.current = new Compartment();

      const { version, doc, cursorName } = await getDocument({
        roomId,
        fileName,
        socket,
        cursorName: cursorText,
      });

      const extensions = getExtensions({
        socket,
        lineWrap: lineWrapRef.current,
        tooltipText: cursorText,
        cursorId: cursorName,
        withTooltip,
        fileName,
        onChange,
        version,
        roomId,
        userId,
      });

      setExtensions(extensions);
      setDoc(doc.toString());
      setKey((prev) => ++prev);
      setIsLoading(false);
    },
    [roomId, cursorText, onChange, withTooltip]
  );

  // ------------------------------------------------------ //
  //                   Initialize SubOwner                  //
  // ------------------------------------------------------ //

  const runInitSubOwner = useCallback(
    async (isFirstInit: boolean) => {
      firstInit.current = false;

      if (!isFirstInit) {
        await baseInit(activeFile);
        return;
      }

      const fileInfo = await getFileInfo(roomId, socket);

      onResetFileManager(fileInfo);

      if (fileInfo.activeFile === activeFile) {
        await runInitSubOwner(false);
      }
    },
    [activeFile, baseInit, onResetFileManager]
  );

  // ------------------------------------------------------ //
  //                   Initialize Owner                     //
  // ------------------------------------------------------ //

  const runInitOwner = useCallback(
    async (isFirstInit: boolean) => {
      firstInit.current = false;

      const fileInfo = await getFileInfo(roomId, socket);

      if (!isFirstInit || fileInfo == null) {
        await baseInit(activeFile);
        return;
      }

      onResetFileManager(fileInfo);

      if (fileInfo.activeFile === activeFile) {
        await runInitOwner(false);
      }
    },
    [activeFile, baseInit, onResetFileManager]
  );

  // ------------------------------------------------------ //
  //                   Initialize Watcher                   //
  // ------------------------------------------------------ //

  const runInitWatcher = useCallback(async () => {
    firstInit.current = false;

    let _activeFile = activeFile;
    const fileInfo = await getFileInfo(roomId, socket);

    if (fileInfo != null) {
      const shouldChangeFile =
        fileInfo.activeFile != null && fileInfo.activeFile !== activeFile;

      if (shouldChangeFile) {
        setActiveFile(fileInfo.activeFile);
        return;
      }

      _activeFile = fileInfo.activeFile ?? activeFile;

      socket.on(
        SubscribedEvents.ActiveFileChanged,
        (_roomId: string, fileName: string) => {
          if (_roomId === roomId) {
            setActiveFile(fileName);
          }
        }
      );
    }

    await baseInit(_activeFile);
  }, [activeFile, baseInit, setActiveFile]);

  const initialize = useMemo(
    () => ({
      [EditorMode.Owner]: runInitOwner,
      [EditorMode.SubOwner]: runInitSubOwner,
      [EditorMode.Watcher]: runInitWatcher,
    }),
    [runInitWatcher, runInitOwner, runInitSubOwner]
  );

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

  return {
    editorRef,
    activeFile,
    extensions,
    doc,
    key,
    isLoading,
    onCreateEditor,
  };
};
