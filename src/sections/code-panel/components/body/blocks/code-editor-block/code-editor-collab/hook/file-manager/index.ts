import { useState, useCallback, useEffect } from 'react'

import { useRouter } from 'next/router'
import type { Socket } from 'socket.io-client'

import { EditorMode, MIN_FILE_LIST_LENGTH } from '../constants'
import { type FileInfo, type File } from '../requests'
import { EmitSocketEvents } from '../utils/socket'

import { useModeSubscriptions } from './useModeSubscriptions'

interface UseFileManagerReturn {
  isOpen: boolean
  fileList: File[]
  addedFileList: File[]
  isFileFormOpen: boolean
  onAddFile: (fileName: string) => Promise<void>
  activeFile?: File
  setActiveFile: (fileName: File) => void
  setIsOpen: (isOpen: boolean) => void
  setIsFileFormOpen: (isOpen: boolean) => void
  onDeleteFile: (fileName: File) => File | null
  onDeleteFileWithEvents: (fileName: File) => void
  onResetFileManager: (info?: FileInfo) => void
  onChangeFileWithEvents: (fileName: File) => void
}

interface UseFileManagerProps {
  socket?: Socket
  roomId: string
  mode: EditorMode
}

export const useFileManager = ({
  socket,
  roomId,
  mode,
}: UseFileManagerProps): UseFileManagerReturn => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const [activeFile, _setActiveFile] = useState<File | undefined>()
  const [fileList, setFileList] = useState<File[]>([])
  const [addedFileList, setAddedFileList] = useState<File[]>([])
  const [isFileFormOpen, setIsFileFormOpen] = useState(false)

  useEffect(() => {
    if (router.query.id) {
      fetch(
        `${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_file?stream_room_id=${router.query.id}`,
        { method: 'GET' }
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((res) => {
          setFileList(res)
          setActiveFile(res[0])
        })
    }
  }, [router.query.id])

  // ------------------------------------------------------ //
  //                        Handlers                        //
  // ------------------------------------------------------ //

  const onAddFile = useCallback(
    async (fileName: string): Promise<void> => {
      // TODO: MOVE TO RTKQuery
      fetch(`${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_file`, {
        method: 'POST',
        body: JSON.stringify({
          name: fileName.split('.')[0],
          code: '',
          extension: fileName.split('.')[1],
          stream_room_id: router.query.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((res) => {
          setFileList([...fileList, res])
        })
    },
    [router.query.id, fileList]
  )

  const onDeleteFile = useCallback(
    (fileName: File) => {
      if (fileList.length === MIN_FILE_LIST_LENGTH) {
        return null
      }

      try {
        fetch(
          `${process.env.NEXT_PUBLIC_CODE_STREAM_API}/stream_file/${fileName._id}?stream_room_id=${router.query.id}`,
          { method: 'DELETE' }
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    [fileList, addedFileList, activeFile, roomId, socket]
  )

  const onChangeFileWithEvents = (fileName: File): void => {
    setActiveFile(fileName)

    if (mode === EditorMode.Owner) {
      socket?.emit(EmitSocketEvents.SetActiveFile, roomId, fileName)
    }
  }

  const setActiveFile = useCallback(
    (fileName: File): void => {
      const isExist = addedFileList.some(({ _id }) => fileName._id === _id)

      if (!isExist) {
        const newAddedFileList = [fileName, ...addedFileList]

        setAddedFileList(newAddedFileList)

        // socket?.emit(EmitSocketEvents.AddedFileListUpdated, roomId, newAddedFileList)
      }

      _setActiveFile(fileName)
    },
    [addedFileList, socket, mode, roomId]
  )

  const onResetFileManager = useCallback(({ activeFile, files, filesInLayout }: any) => {
    _setActiveFile(activeFile)
    setFileList(files)
    setAddedFileList(filesInLayout)
  }, [])

  const onUpdateFileList = useCallback(
    (fileName: File, socketId: string) => {
      if (socket?.id !== socketId) {
        setFileList((prev) => {
          const isExist = prev.some(({ _id }) => _id === fileName._id)

          return isExist ? prev : [...prev, fileName]
        })
      }
    },
    [socket]
  )

  useEffect(() => {
    if (!socket) {
      return
    }

    if (!socket.hasListeners('fileRemoved')) {
      socket.off('fileRemoved')
    }

    socket?.on('fileRemoved', (file_id: string) => {
      const newFileList = [...fileList]
      const sideMenuFileIndex = newFileList.findIndex(({ _id }) => _id === file_id)
      const tabFileIndex = addedFileList.findIndex(({ _id }) => _id === file_id)

      if (tabFileIndex > -1) {
        const newAddedFileList = [...addedFileList]
        newAddedFileList.splice(tabFileIndex, 1)
        setAddedFileList(newAddedFileList)

        if (file_id === activeFile?._id) {
          const firstTabFile = newAddedFileList[0]

          if (firstTabFile) {
            _setActiveFile(firstTabFile)
          } else {
            _setActiveFile(newFileList[0])
            setAddedFileList([newFileList[0]])
          }
        }
      }

      newFileList.splice(sideMenuFileIndex, 1)
      setFileList(newFileList)
    })

    if (!socket.hasListeners('fileAdded')) {
      socket?.on('fileAdded', (file: File) => {
        setFileList((prev) => [...prev, file])
      })
    }
  }, [socket, fileList, addedFileList, activeFile])

  useModeSubscriptions({
    roomId,
    onDeleteFile,
    setActiveFile,
    onUpdateFileList,
    socket,
    mode,
  })

  // ------------------------------------------------------ //

  return {
    onAddFile,
    isOpen,
    isFileFormOpen,
    fileList,
    activeFile,
    setActiveFile,
    setIsOpen,
    setIsFileFormOpen,
    addedFileList,
    onDeleteFile: onDeleteFile as (fileName: File) => File | null, // Fix: Change the return type of onDeleteFile
    onResetFileManager,
    onDeleteFileWithEvents: onDeleteFile,
    onChangeFileWithEvents,
  }
}
