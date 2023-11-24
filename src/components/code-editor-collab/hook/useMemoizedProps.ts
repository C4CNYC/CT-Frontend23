import { useCallback, useEffect, useRef } from "react";

import { type FileInfo } from "./utils/peer-extension";

export interface MemoizedProps {
	cursorText?: string
	withTooltip?: boolean
	onChange?: (code: string) => void
  code?: string
	preloadedCode?: string
  setActiveFile: (fileName: string) => void
  onResetFileManager: (info: FileInfo) => void
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
}: MemoizedProps): MemoizedPropsReturn => {
  const codeRef = useRef(code);
  const onChangeRef = useRef(onChange);
  const withTooltipRef = useRef(withTooltip);
  const preloadedCodeRef = useRef(preloadedCode);
  const setActiveFileRef = useRef(setActiveFile);
  const cursorTextRef = useRef<string>(cursorText);
  const onResetFileManagerRef = useRef(onResetFileManager);

  useEffect(() => {
    setActiveFileRef.current = setActiveFile;
  }, [setActiveFile]);

  useEffect(() => {
    onResetFileManagerRef.current = onResetFileManager;
  }, [onResetFileManager]);

  useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

  const _onChange = useCallback((code: string): void => {
    onChangeRef.current?.(code);
  }, []);

  const _onResetFileManager = useCallback((fileInfo: FileInfo) => {
    onResetFileManagerRef.current(fileInfo);
  }, []);

  const _setActiveFile = useCallback((fileName: string) => {
    setActiveFileRef.current(fileName);
  }, []);

  return {
    onChange: _onChange,
    onResetFileManager: _onResetFileManager,
    setActiveFile: _setActiveFile,
    cursorText: cursorTextRef.current,
    withTooltip: withTooltipRef.current,
    preloadedCode: preloadedCodeRef.current,
    code: codeRef.current
  }
}