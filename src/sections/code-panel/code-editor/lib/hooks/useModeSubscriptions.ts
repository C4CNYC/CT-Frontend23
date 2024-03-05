import { type MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react'

import pDebounce from 'p-debounce'
import { Socket } from 'socket.io-client'

import { SubscribedEvents } from '../../../lib/utils/socket'
import { RoomStatus } from '../../status-label'

import { EditorMode } from './constants'

interface UseModeSubscriptionsProps {
  roomId: string
  socket?: Socket
  initializeBlockedRef: MutableRefObject<boolean>
  runInitWatcher: () => Promise<void>
  runInitSubOwner: (isFirstInit: boolean) => void
  mode: EditorMode
  roomStatus: RoomStatus
  onChangeStreamingDocInfo?: (doc: any) => void
}

const CODE_CHANGE_DELAY = 700

export const useModeSubscriptions = ({
  mode,
  roomId,
  socket,
  roomStatus,
  runInitWatcher,
  runInitSubOwner,
  initializeBlockedRef,
  onChangeStreamingDocInfo,
}: UseModeSubscriptionsProps) => {
  const runInitWatcherRef = useRef(runInitWatcher)
  const runInitSubOwnerRef = useRef(runInitSubOwner)

  const delayedOnChange = useCallback(
    pDebounce((doc) => {
      onChangeStreamingDocInfo?.(doc)
    }, CODE_CHANGE_DELAY),
    [onChangeStreamingDocInfo]
  )

  useEffect(() => {
    runInitWatcherRef.current = runInitWatcher
  }, [runInitWatcher])

  useEffect(() => {
    runInitSubOwnerRef.current = runInitSubOwner
  }, [runInitWatcher])

  const modeSockets = useMemo(() => {
    const existResponseEvent = `${SubscribedEvents.RoomExistResponse}${roomId}`
    const deleteResponseEvent = `${SubscribedEvents.RoomDeleteResponse}${roomId}`
    const docUpdatedEvent = `${SubscribedEvents.DocUpdated}${roomId}`

    return {
      subscribe: {
        [EditorMode.Watcher]: {
          [RoomStatus.Inactive]: () => {
            socket?.on(existResponseEvent, () => {
              initializeBlockedRef.current = false
              runInitWatcherRef.current()
            })
          },
          [RoomStatus.Active]: () => {
            socket?.on(deleteResponseEvent, () => {
              initializeBlockedRef.current = false
              runInitWatcherRef.current()
            })
          },
        },
        [EditorMode.SubOwner]: {
          [RoomStatus.Inactive]: () => {
            socket?.on(existResponseEvent, () => {
              initializeBlockedRef.current = false
              runInitSubOwnerRef.current(true)
            })
          },
          [RoomStatus.Active]: () => {
            socket?.on(deleteResponseEvent, () => {
              initializeBlockedRef.current = false
              runInitSubOwnerRef.current(true)
            })
            socket?.on(docUpdatedEvent, delayedOnChange)
          },
        },
        [EditorMode.Owner]: {
          [RoomStatus.Active]: () => {
            socket?.on(docUpdatedEvent, delayedOnChange)
          },
          [RoomStatus.Inactive]: null,
        },
      },
      unsuscribe: {
        [RoomStatus.Inactive]: () => {
          socket?.off(existResponseEvent)
        },
        [RoomStatus.Active]: () => {
          socket?.off(deleteResponseEvent)
          socket?.off(docUpdatedEvent)
        },
      },
    }
  }, [roomId, socket, runInitSubOwnerRef, runInitWatcherRef, delayedOnChange])

  useEffect(() => {
    modeSockets.subscribe[mode][roomStatus]?.()

    return () => {
      modeSockets.unsuscribe[roomStatus]()
    }
  }, [mode, roomStatus, modeSockets])
}
