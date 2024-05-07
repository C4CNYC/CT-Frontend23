import { type Update } from '@codemirror/collab'
import { Text } from '@codemirror/state'
import { Socket } from 'socket.io-client'

import { EmitSocketEvents, SubscribedEvents } from '../utils/socket'

export const createFile = async ({
  socket,
  fileName,
  roomId,
  defaultDoc,
}: CreateFile): Promise<File> => {
  return await new Promise((res, rej) => {
    socket.emit(EmitSocketEvents.CreateFile, { roomId, fileName, defaultDoc })

    socket.once(`${SubscribedEvents.CreateFileResponse}${roomId}`, (file: File | null) => {
      if (file != null) {
        res(file)
      } else {
        rej()
      }
    })
  })
}
export const getFileInfo = async (roomId: string, socket: Socket): Promise<FileInfo> => {
  return await new Promise((resolve) => {
    socket.emit(EmitSocketEvents.GetFileInfo, roomId, socket.id)

    socket.once(SubscribedEvents.GetFileInfoResponse + socket.id, (info: FileInfo) => {
      resolve(info)
    })
  })
}

export const isRoomExist = async (roomId: string, socket: Socket): Promise<boolean> => {
  return await new Promise((resolve) => {
    socket.emit('isRoomExist', roomId, socket.id)

    socket.once('isRoomExistResponse' + roomId + socket.id, (isExist: boolean) => {
      resolve(isExist)
    })
  })
}

export const getDocument = async ({
  socket,
  ...other
}: GetDocumentProps): Promise<GetDocumentReturn> => {
  return await new Promise(function (resolve) {
    if (!socket) {
      alert('TODO getDocument not implemented without sockets')
      resolve({
        doc: Text.of(['']),
        ...other,
      } as any)
    } else {
      socket.emit(EmitSocketEvents.GetDoc, other)
      socket.once(SubscribedEvents.GetDocResponse, ({ doc, ...other }) => {
        resolve({
          doc: doc?.length > 0 ? Text.of(doc.split('\n')) : Text.of(['']),
          ...other,
        })
      })
    }
  })
}

interface GetCodeInfo {
  socket: Socket
  roomId: string
}

export const getCodeInfo = async ({ socket, roomId }: GetCodeInfo): Promise<any> => {
  return await new Promise(function (resolve) {
    socket.emit('getCode', roomId)

    socket.once('getCodeResponse' + roomId, (data) => {
      resolve(data)
    })
  })
}

interface GetDocumentProps {
  socket?: Socket
  roomId: string
  cursorName: string
  fileName: File
  preloadedCode?: string
  defaultFileName: string
}

interface GetDocumentReturn {
  version: number
  doc: Text
  cursorName: string
  updates: Update[]
  docInfo: Record<string, string>
}

export interface File {
  id: string
  name: string
}

export interface FileInfo {
  activeFile: File
  files: File[]
  filesInLayout: File[]
}

interface CreateFile {
  socket: Socket
  fileName: string
  roomId: string
  defaultDoc?: string
}
