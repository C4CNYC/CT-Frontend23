import { type FC, memo, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { AuthUserType } from '@/auth/types'
import { useSelector } from '@/redux/store'
import CodeEditorCollab from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab'
import LoadingCodeEditor from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/components/loading-code-editor'
import { waitConnectSocket } from '@/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/utils/socket'
import { voidFunction } from '@root/src/utils'

import FileModal from '../code-editor-collab/components/file-modal'
import FileSwitcher from '../code-editor-collab/components/file-switcher'
import { EditorMode } from '../code-editor-collab/hook/constants'
import { useFileManager } from '../code-editor-collab/hook/file-manager'

interface CodeEditorControllerProps {
  onChangeStreamingDocInfo?: (value: Record<string, string>) => void
  user?: AuthUserType
  isFetching?: boolean
  preloadedCode?: string
}

const CodeEditorController: FC<CodeEditorControllerProps> = ({
  onChangeStreamingDocInfo = voidFunction,
  user,
  isFetching = false,
  preloadedCode,
}) => {
  const room = useSelector((state) => state.codeEditorController.room)
  const socket = useSelector((state) => state.codePanelGlobal.socket)

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
    onCloseTabFile,
  } = useFileManager({
    socket,
    roomId: room?.roomId!,
    mode: EditorMode.Owner,
  })

  useEffect(() => {
    const runAsyncEffect = async (socket: Socket) => {
      const isConnected = await waitConnectSocket(socket)

      if (!isConnected) {
        void runAsyncEffect(socket)
      }
    }
  }, [socket])

  if (room == null) {
    return null
  }

  return (
    <div style={{ position: 'relative', background: '#282c34', height: '100%', width: '100%' }}>
      <FileModal
        isOpen={isOpen}
        isFileFormOpen={isFileFormOpen}
        setActiveFile={onChangeFileWithEvents}
        setIsOpen={setIsOpen}
        fileList={fileList}
        setIsFileFormOpen={setIsFileFormOpen}
        onAddFile={onAddFile}
        onDeleteFile={onDeleteFileWithEvents}
        mode={EditorMode.Owner}
        isMultipleExtensionFiles={false}
      />

      <FileSwitcher
        activeFile={activeFile}
        onClose={onCloseTabFile}
        onChange={onChangeFileWithEvents}
        fileList={addedFileList}
      />
      {!isFetching ? (
        <CodeEditorCollab
          activeFile={activeFile}
          roomId={room.roomId}
          cursorText={room.cursorText}
          preloadedCode={preloadedCode}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          code={room.code}
          mode={room.mode}
          socket={socket}
          user={user}
          isFetching={isFetching}
        />
      ) : (
        <LoadingCodeEditor />
      )}
    </div>
  )
}

export default memo(CodeEditorController)
