import { sendableUpdates } from '@codemirror/collab'
import { Socket } from 'socket.io-client'

import type { File } from '../../requests'
import { EmitSocketEvents, SubscribedEvents } from '../../utils/socket'

interface PushUpdatesProps {
  socket: Socket
  roomId: string
  version: number
  updates: ReturnType<typeof sendableUpdates>
  fileName: File
}

export const pushUpdates = ({
  socket,
  roomId,
  version,
  updates,
  fileName,
}: PushUpdatesProps): Promise<boolean> => {
  return new Promise(function (resolve) {
    socket.emit(EmitSocketEvents.Push, {
      roomId,
      version,
      updates: updates.map(({ changes, ...other }) => ({
        changes: changes.toJSON(),
        ...other,
      })),
      fileName,
    })
    socket.once(SubscribedEvents.PushResponse, function (status: boolean) {
      resolve(status)
    })
  })
}
