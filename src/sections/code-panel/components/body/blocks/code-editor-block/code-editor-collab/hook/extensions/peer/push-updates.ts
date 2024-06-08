import { sendableUpdates } from '@codemirror/collab'
import { Socket } from 'socket.io-client'

import { EmitSocketEvents, SubscribedEvents } from '../../utils/socket'

interface PushUpdatesProps {
  socket: Socket
  roomId_fileId: string
  version: number
  updates: ReturnType<typeof sendableUpdates>
}

export const pushUpdates = ({
  socket,
  roomId_fileId,
  version,
  updates,
}: PushUpdatesProps): Promise<boolean> => {
  return new Promise(function (resolve) {
    socket.emit(
      EmitSocketEvents.Push,
      roomId_fileId,
      JSON.stringify({
        roomId_fileId,
        version,
        updates: updates.map(({ changes, ...other }) => ({
          changes: changes.toJSON(),
          ...other,
        })),
      })
    )
    socket.once(SubscribedEvents.PushResponse, function (status: boolean) {
      resolve(status)
    })
  })
}
