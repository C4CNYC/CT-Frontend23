import { useCallback, useEffect, useRef } from "react";
import { File, type FileInfo } from "./utils/collab/requests";

export interface MemoizedProps {
  code?: string
  cursorText?: string
	withTooltip?: boolean
	preloadedCode?: string
	onChange?: (code: Record<string, string>) => void
  setActiveFile: (fileName: File) => void
  onResetFileManager: (info?: FileInfo) => void
  defaultFileName: string
}

interface MemoizedPropsReturn extends Omit<MemoizedProps, 'cursorText' | 'withTooltip'> {
  cursorText: string
  withTooltip: boolean
}

export const useMemoizedProps = ({
  cursorText = 'Unknown',
  withTooltip = true,
  onChange,
  onResetFileManager,
  setActiveFile,
  code,
  preloadedCode,
  defaultFileName,
}: MemoizedProps): MemoizedPropsReturn => {
  const codeRef = useRef(code);
  const onChangeRef = useRef(onChange);
  const withTooltipRef = useRef(withTooltip);
  const preloadedCodeRef = useRef(preloadedCode);
  const setActiveFileRef = useRef(setActiveFile);
  const cursorTextRef = useRef<string>(cursorText);
  const onResetFileManagerRef = useRef(onResetFileManager);
  const defaultFileNameRef = useRef(defaultFileName);

  useEffect(() => {
    setActiveFileRef.current = setActiveFile;
  }, [setActiveFile]);

  useEffect(() => {
    onResetFileManagerRef.current = onResetFileManager;
  }, [onResetFileManager]);

  useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

  const _onChange = useCallback((code: Record<string, string>): void => {
    onChangeRef.current?.(code);
  }, []);

  const _onResetFileManager = useCallback((fileInfo?: FileInfo) => {
    onResetFileManagerRef.current(fileInfo);
  }, []);

  const _setActiveFile = useCallback((fileName: File) => {
    setActiveFileRef.current(fileName);
  }, []);

  return {
    onChange: _onChange,
    onResetFileManager: _onResetFileManager,
    setActiveFile: _setActiveFile,
    cursorText: cursorTextRef.current,
    withTooltip: withTooltipRef.current,
    preloadedCode: preloadedCodeRef.current,
    defaultFileName: defaultFileNameRef.current,
    code: codeRef.current
  }
}
