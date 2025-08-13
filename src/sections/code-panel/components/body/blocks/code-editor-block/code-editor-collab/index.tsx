import { type FC, memo, useContext, useEffect, useMemo, useState } from 'react'

import CodeMirror from '@uiw/react-codemirror'

import { useDispatch } from '@/redux/store'
import { setCode } from '@root/src/redux/slices/code-panel-global'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import FileModal from './components/file-modal'
import FileSwitcher from './components/file-switcher'
import StatusLabel, { RoomStatus } from './components/status-label'
import { useCodeEditorCollab } from './hook'
import { BASIC_SETUP } from './hook/constants'
import { useFileManager } from './hook/file-manager/useFileManager'
import { docBuilder } from './hook/utils/doc-builder'
import { useStyles } from './styles'

interface CodeEditorCollabProps {
  className?: string
  isReadOnly?: boolean
  withFileManager?: boolean
  isMultipleExtensionFiles?: boolean
  preloadedCode?: string
}

const CodeEditorCollab: FC<CodeEditorCollabProps> = ({
  className,
  withFileManager = true,
  isReadOnly: _isReadOnly = false,
  isMultipleExtensionFiles = false,
  ...collabProps
}) => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const codePanelContext = useContext(CodePanelContext)
  const [codeValue, setCodeValue] = useState<string | undefined>('')

  const {
    files,
    isOpen,
    barFiles,
    activeFile,
    isFileControllerAvailable,

    onAddFile,
    setIsOpen,
    onCloseFile,
    onDeleteFile,
    onUpdateFile,
    setActiveFile,
  } = useFileManager()

  let preloadedCode = activeFile?.body || ''
  const { editorRef, extensions, streamingDoc, key, onCreateEditor, roomStatus } =
    useCodeEditorCollab({
      ...collabProps,
      activeFile,
      preloadedCode,
    })

  const isEditorReadOnly = useMemo(
    () => _isReadOnly || roomStatus === RoomStatus.Inactive,
    [_isReadOnly, roomStatus]
  )

  const onChangeCodemirrorValue = (value: string) => {
    codePanelContext.studentCodeChange(value)
    dispatch(
      setCode(
        Object.values(docBuilder(files, activeFile, value)).reduce((acc, curr) => acc + curr, '')
      )
    )
    if (value) {
      if (isFileControllerAvailable && activeFile?.body !== value) {
        onUpdateFile(activeFile?.id as string, {
          body: value,
        })
      }
    }
  }

  useEffect(() => {
    onChangeCodemirrorValue(preloadedCode || '')
  }, [preloadedCode])

  useEffect(() => {
    const newCodeValue =
      preloadedCode ??
      (streamingDoc && streamingDoc.toString()?.length ? streamingDoc?.toString() : preloadedCode)
    setCodeValue(newCodeValue)
  }, [preloadedCode, streamingDoc])

  return (
    <div
      className={`${styles.wrapper} code-editor-wrapper`}
      ref={editorRef}
    >
      {withFileManager && (
        <>
          <FileModal
            files={files}
            isOpen={isOpen}
            isFileControllerAvailable={isFileControllerAvailable}
            setIsOpen={setIsOpen}
            onAddFile={onAddFile}
            onDeleteFile={onDeleteFile}
            setActiveFile={setActiveFile}
          />

          <FileSwitcher
            fileList={barFiles}
            activeFile={activeFile}
            closeTab={onCloseFile}
            onChange={setActiveFile}
          />
        </>
      )}

      <StatusLabel status={roomStatus} />

      <CodeMirror
        key={key}
        theme='dark'
        height='100%'
        value={codeValue}
        className={className}
        extensions={extensions}
        basicSetup={BASIC_SETUP}
        readOnly={isEditorReadOnly}
        onCreateEditor={onCreateEditor}
        onChange={onChangeCodemirrorValue}
      />
    </div>
  )
}

export default memo(CodeEditorCollab)
