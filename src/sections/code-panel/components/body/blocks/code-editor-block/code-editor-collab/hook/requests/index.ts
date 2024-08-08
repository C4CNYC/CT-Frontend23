import { type Update } from '@codemirror/collab'
import { Text } from '@codemirror/state'
import { Socket } from 'socket.io-client'

import { Extensions } from '../constants'
import { EmitSocketEvents, SubscribedEvents } from '../utils/socket'

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
      socket.emit(EmitSocketEvents.GetDoc, other.roomId_fileId, JSON.stringify(other))
      socket.once(SubscribedEvents.GetDocResponse, ({ doc, ...other }) => {
        resolve({
          doc: doc?.length > 0 ? Text.of(doc.split('\n')) : Text.of(['']),
          ...other,
        })
      })
    }
  })
}
interface GetDocumentProps {
  socket?: Socket
  lesson_id: string
  course_id: string
  unit_id: string
  roomId_fileId: string
  cursorName: string
}

interface GetDocumentReturn {
  version: number
  doc: Text
  cursorName: string
  updates: Update[]
  docInfo: Record<string, string>
}

export interface File {
  code: string
  created_at?: string
  extension: Extensions
  name: string
  stream_room_id: string
  updated_at?: string
  _id: string
}

export interface FileInfo {
  activeFile: File
  files: File[]
  filesInLayout: File[]
}
