import { useCallback, useEffect, useRef } from 'react'

export interface MemoizedProps {
  code?: string
  withTooltip?: boolean
  preloadedCode?: string
  onChangeStreamingDocInfo?: (doc: string) => void
  defaultFileName: string
  isFetching?: boolean
}

interface MemoizedPropsReturn extends Omit<MemoizedProps, 'cursorText' | 'withTooltip'> {
  withTooltip: boolean
}

export const useMemoizedProps = ({
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
  const defaultFileNameRef = useRef(defaultFileName)

  useEffect(() => {
    preloadedCodeRef.current = preloadedCode
  }, [preloadedCode])

  useEffect(() => {
    onChangeRef.current = onChangeStreamingDocInfo
  }, [onChangeStreamingDocInfo])

  const _onChange = useCallback((code: string): void => {
    onChangeRef.current?.(code)
  }, [])

  return {
    onChangeStreamingDocInfo: _onChange,
    withTooltip: withTooltipRef.current,
    preloadedCode: preloadedCodeRef.current,
    defaultFileName: defaultFileNameRef.current,
    code: codeRef.current,
  }
}
