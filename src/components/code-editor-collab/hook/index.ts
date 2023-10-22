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
import { langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { indentUnit } from '@codemirror/language';
import { dracula } from "thememirror";

import { cursorExtension } from "./utils/cursors";
import { getDocument, peerExtension } from "./utils/peer-extension";
import { initListeners, removeListeners } from "../../real-time-editor/listeners";
import { BASIC_SETUP } from "./constants";

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
}

interface UseCodeEditorCollabReturn {
  extensions?: Extension[]
  onCreateEditor: (view: EditorView) => void
  editorRef: RefObject<HTMLDivElement>
  isLoading: boolean
}

interface OnInitExtensionsProps {
	version: number
	uniqCursorId: string
	lineWrap: Compartment
}

const createSocket = (): Socket => {
	return io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
		path: "/api"
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
}: UseCodeEditorCollabProps): UseCodeEditorCollabReturn => {
  const editorRef = useRef<HTMLDivElement | null>(null);
	const editorView = useRef<EditorView | null>(null);
	const lineWrapRef = useRef<Compartment | null>(null);
  const socketRef = useRef<Socket>(createSocket());

  // memoized props 
  // all props which depend on peer extension should be memoized to avoid redundant re-render 
  // and re-dispatch local state(ui)/collaboration state(on server) to avoid conflict versions
  const cursorTextRef = useRef<string>(cursorText);
	const withTooltipRef = useRef(withTooltip);
	const roomIdRef = useRef(roomId);
  const modeRef = useRef(mode);
	const onChangeRef = useRef(onChange);
	const preloadedCodeRef = useRef(preloadedCode);
  const codeRef = useRef(code);

	const [extensions, setExtensions] = useState<Extension[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  // initialize extenstion for collaboration
	const onInitExtensions = useCallback(({
		version,
		uniqCursorId,
		lineWrap
	}: OnInitExtensionsProps): Extension[] => {
		return [
			indentUnit.of("\t"),
			basicSetup(BASIC_SETUP), 
			langs.html(),
			dracula,
			lineWrap.of(EditorView.lineWrapping),
			EditorView.updateListener.of((e) => {
				onChangeRef.current?.(e.state.doc.toString());
			}),
			peerExtension({
				socket: socketRef.current,
				roomId: roomIdRef.current,
				startVersion: version,
				cursorId: uniqCursorId,
			}),
			cursorExtension({
				cursorId: uniqCursorId,
				tooltipText: cursorTextRef.current,
				withTooltip: withTooltipRef.current
			})
		]
	}, []);

	const onCreateEditor = useCallback((view: EditorView) => {
		editorView.current = view;

		const runInit = async () => {
			lineWrapRef.current = new Compartment();

      try {
        // get init data from server
        const { version, doc, cursorName } = await getDocument({
          socket: socketRef.current,
          roomId: roomIdRef.current,
          cursorName: cursorTextRef.current,
        });
  
        // initialize extensions according to getting data from server
        const extensions = onInitExtensions({
          version,
          uniqCursorId: cursorName,
          lineWrap: lineWrapRef.current
        });

        setExtensions(extensions);

        // initialize default value for code editor
        // the first priority is 'code' prop (code saved in local storage)
        // second priority 'preloaded code' prop (strict preload code from API)
        const defaultCode = codeRef.current || preloadedCodeRef.current;
        // preloaded code should be initialized only for student mode 
        const isPreloadedCodeExist = modeRef.current !== EditorMode.Watcher && defaultCode !== "";

        if (isPreloadedCodeExist) {
          // wait for initialize peer extension to dispatch the preloaded code
          setTimeout(() => {
            view.dispatch({
              changes: [{
                from: 0,
                insert: defaultCode
              }]
            });
            setIsLoading(false)
          }, 500)
        } else {
          // set sync collab state(from server) for watcher/teacher
          view.dispatch({
            changes: [{
              from: 0,
              insert: doc.toString()
            }]
          });
          setIsLoading(false)
        }

        initListeners(
          view,
          editorRef,
          { preloadedCode: preloadedCodeRef.current },
          lineWrapRef.current
        );
      } catch {
        setIsLoading(false)
      }
		}

		void runInit();
	}, [onInitExtensions]);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		return () => {
      if (modeRef.current === EditorMode.Student) {
        socketRef.current.emit("deleteRoom", roomIdRef.current)
      }

      socketRef.current.off('pullUpdateResponse');
			socketRef.current.off('pushUpdateResponse');
			socketRef.current.off('getDocumentResponse');

			if (editorView.current != null && lineWrapRef.current != null) {
				removeListeners(
					editorView.current,
					editorRef,
					{ preloadedCode: preloadedCodeRef.current },
					lineWrapRef.current
				);

				editorView.current.destroy();
			}
		}
	}, []);

  return {
    onCreateEditor,
    editorRef,
    extensions,
    isLoading,
  }
}