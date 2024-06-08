import { type Update } from '@codemirror/collab'
import { ChangeSet, StateEffect, StateEffectType } from '@codemirror/state'
import { Socket } from 'socket.io-client'

import { EffectType } from '../../constants'
import { EmitSocketEvents } from '../../utils/socket'
import type { Cursor } from '../cursors/types'

interface PullUpdateProps {
  roomId_fileId: string
  version: number
  socket: Socket
  addCursor: StateEffectType<Cursor>
  commentEffect: StateEffectType<any>
}

export const pullUpdates = ({
  socket,
  roomId_fileId,
  version,
  addCursor,
  commentEffect,
}: PullUpdateProps): Promise<Update[]> => {
  return new Promise<Update[]>(function (resolve) {
    socket.emit(
      EmitSocketEvents.Pull,
      roomId_fileId,
      JSON.stringify({
        roomId_fileId,
        version,
        socketId: socket.id,
      })
    )
    socket.once(`${EmitSocketEvents.PullResponse}${roomId_fileId}`, function (updates: Update[]) {
      resolve(updates)
    })
  }).then((updates: Update[]) => {
    return new Promise<Update[]>(function (resolve) {
      socket.emit(
        EmitSocketEvents.Pull,
        roomId_fileId,
        JSON.stringify({
          roomId_fileId,
          version,
          socketId: socket.id,
        })
      )

      socket.once(`${EmitSocketEvents.PullResponse}${roomId_fileId}`, function (updates: Update[]) {
        resolve(updates)
      })
    }).then((updates: Update[]) =>
      updates?.map((u: Update) => {
        if (u.effects?.length) {
          return {
            changes: ChangeSet.fromJSON(u.changes),
            clientID: u.clientID,
            effects: u.effects.reduce<StateEffect<Cursor>[]>((res, { value }) => {
              const isSelection = value.type === EffectType.SELECTION && value?.id != null
              const isComment = value.type === EffectType.COMMENT

              if (isSelection) {
                res.push(addCursor.of({ ...value }))
              }

              if (isComment) {
                res.push(commentEffect.of({ ...value }))
              }

              return res
            }, []),
          }
        }

        return {
          changes: ChangeSet.fromJSON(u.changes),
          clientID: u.clientID,
        }
      })
    )
  })
}
