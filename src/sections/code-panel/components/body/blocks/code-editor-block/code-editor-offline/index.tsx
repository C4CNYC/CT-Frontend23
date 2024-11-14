import { type FC, memo, useContext, useEffect, useMemo, useState } from 'react'

import { indentUnit } from '@codemirror/language'
import { Compartment, EditorState } from '@codemirror/state'
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setPrevLessonCode, setPrevLessonId } from '@/redux/slices/code-panel-global'
import { useSelector } from '@/redux/store'
import { voidFunction } from '@/utils'
import { CodePanelContext } from '@root/src/sections/code-panel/lib/CodePanelContext'

import FileModal from '../code-editor-collab/components/file-modal'
import FileSwitcher from '../code-editor-collab/components/file-switcher'
import { UseCodeEditorCollabProps } from '../code-editor-collab/hook'

import { BASIC_SETUP } from './hook/constants'
import { useFileManager } from './hook/file-manager'
import { language } from './hook/utils'
import { useStyles } from './styles'

type ReducedFields =
  | 'activeFile'
  | 'onDeleteFile'
  | 'setActiveFile'
  | 'onResetFileManager'
  | 'socket'
  | 'setLocalActiveFile'
  | 'defaultFileName'

interface CodeEditorCollabProps extends Omit<UseCodeEditorCollabProps, ReducedFields> {
  className?: string
  isReadOnly?: boolean
  preloadedCode?: string
  withFileManager?: boolean
  isMultipleExtensionFiles?: boolean
  defaultFileName?: string
  onChangeCodemirrorValue?: (value: string) => void
}

const getLocalStorageRoomKey = (roomId: string | undefined): string => `room_doc_${roomId}`

const CodeEditorOffline: FC<CodeEditorCollabProps> = ({
  roomId,
  className,
  preloadedCode,
  withFileManager = true,
  isReadOnly: _isReadOnly = false,
  isMultipleExtensionFiles = false,
  onChangeCodemirrorValue: onChangeCodemirrorValueFromProps = voidFunction,
}) => {
  const styles = useStyles()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const codePanelContext = useContext(CodePanelContext)

  const [codeValue, setCodeValue] = useState<string | undefined>('')

  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const prevLessonId = useSelector((state) => state.codePanelGlobal.prevLessonId)
  const prevLessonCode = useSelector((state) => state.codePanelGlobal.prevLessonCode)

  const lessonIdFromQuery = query?.lessonId
  const sandbox = searchParams.get('sandbox')

  const {
    activeFile,
    isFileFormOpen,
    isOpen,
    setIsOpen,
    fileList,
    setIsFileFormOpen,
    onAddFile,
    addedFileList,
    onDeleteFileWithEvents,
    onChangeFileWithEvents,
  } = useFileManager({
    roomId,
  })

  const lineWrap = useMemo(() => new Compartment(), [])

  const localstorageCode = useMemo(() => {
    if (!lessonId && !lessonIdFromQuery) {
      if (!sandbox) {
        return
      }
    }

    if (prevLessonCode) {
      return prevLessonCode
    }
    const localStorageKey = getLocalStorageRoomKey(
      `${lessonId}${lessonIdFromQuery}${activeFile?.id}`
    )
    const localStorageCodeValue = localStorage.getItem(localStorageKey)
    if (localStorageCodeValue) {
      try {
        const docInfo = JSON.parse(localStorageCodeValue) as Record<string, string>
        const code = prevLessonCode ?? (docInfo?.htmlBody as unknown as string[])?.join('')
        if (code) {
          return code
        }
      } catch (e) {
        return localStorageCodeValue
      }
    }
  }, [query?.lessonId, prevLessonId, preloadedCode, lessonId, activeFile, lessonIdFromQuery])

  const onChangeCodemirrorValue = (value: string) => {
    onChangeCodemirrorValueFromProps(value)
    codePanelContext.studentCodeChange(value)
    if (value) {
      const localStorageKey = getLocalStorageRoomKey(
        `${lessonId}${lessonIdFromQuery}${activeFile?.id}`
      )
      localStorage.setItem(localStorageKey, value)
    }
  }

  useEffect(() => {
    setCodeValue((localstorageCode ?? prevLessonCode)!)
    onChangeCodemirrorValue((localstorageCode ?? preloadedCode) || '')
  }, [preloadedCode, localstorageCode])

  useEffect(() => {
    // TODO: check it and remove in case of unnecessary
    return () => {
      dispatch(setPrevLessonId(null))
      dispatch(setPrevLessonCode(null))
    }
  }, [])

  useEffect(() => {
    if (!preloadedCode) return
    window.addEventListener('reset-lesson-event', (event) => {
      if (preloadedCode) {
        onChangeCodemirrorValue(preloadedCode as string)
        setCodeValue(preloadedCode as string)
      } else {
        onChangeCodemirrorValue('')
        setCodeValue('')
      }
    })
  }, [preloadedCode])

  return (
    <div className={`${styles.wrapper} code-editor-wrapper`}>
      {withFileManager && (
        <>
          <FileModal
            isOpen={isOpen}
            creationDisabled
            fileList={fileList}
            onAddFile={onAddFile}
            setIsOpen={setIsOpen}
            isFileFormOpen={isFileFormOpen}
            onDeleteFile={onDeleteFileWithEvents}
            setIsFileFormOpen={setIsFileFormOpen}
            setActiveFile={onChangeFileWithEvents}
            isMultipleExtensionFiles={isMultipleExtensionFiles}
          />

          <FileSwitcher
            activeFile={activeFile}
            onChange={onChangeFileWithEvents}
            fileList={addedFileList}
          />
        </>
      )}

      {
        <>
          <CodeMirror
            className={className}
            height='100%'
            basicSetup={BASIC_SETUP}
            theme='dark'
            extensions={[
              indentUnit.of('\t'),
              basicSetup(BASIC_SETUP),
              ...language(activeFile),
              EditorState.lineSeparator.of('\n'),
              dracula,
              lineWrap.of(EditorView.lineWrapping),
            ]}
            readOnly={_isReadOnly}
            value={codeValue || ''}
            onChange={onChangeCodemirrorValue}
          />
        </>
      }
    </div>
  )
}

export default memo(CodeEditorOffline)
