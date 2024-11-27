import { useCallback, useEffect, useRef } from 'react'

export interface MemoizedProps {
  code?: string
  cursorText?: string
  withTooltip?: boolean
  preloadedCode?: string
  onChangeStreamingDocInfo?: (doc: Record<string, string>) => void
  defaultFileName: string
  isFetching?: boolean
}

interface MemoizedPropsReturn extends Omit<MemoizedProps, 'cursorText' | 'withTooltip'> {
  cursorText: string
  withTooltip: boolean
}

export const useMemoizedProps = ({
  cursorText = 'Unknown',
  withTooltip = true,
  onChangeStreamingDocInfo,
  code,
  preloadedCode,
  defaultFileName,
}: MemoizedProps): MemoizedPropsReturn => {
  const codeRef = useRef(code)
  const onChangeRef = useRef(onChangeStreamingDocInfo)
  const withTooltipRef = useRef(withTooltip)
  const preloadedCodeRef = useRef(preloadedCode)
  const cursorTextRef = useRef<string>(cursorText)
  const defaultFileNameRef = useRef(defaultFileName)

  useEffect(() => {
    preloadedCodeRef.current = preloadedCode
  }, [preloadedCode])

  useEffect(() => {
    onChangeRef.current = onChangeStreamingDocInfo
  }, [onChangeStreamingDocInfo])

  const _onChange = useCallback((code: Record<string, string>): void => {
    onChangeRef.current?.(code)
  }, [])

  return {
    onChangeStreamingDocInfo: _onChange,
    cursorText: cursorTextRef.current,
    withTooltip: withTooltipRef.current,
    preloadedCode: preloadedCodeRef.current,
    defaultFileName: defaultFileNameRef.current,
    code: codeRef.current,
  }
}
