import { type MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'

import { type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useSelector } from '@/redux/store'
import { SocketEventsStudentMode } from '@root/src/sections/code-panel/lib/events/mode'
import { ILessonUserStatus } from '@root/src/types'

import { type DraggableBlockConfig, getDraggableBlockConfig } from './utils'

interface UseNavPanelReturn {
  drawerRef: MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (user: ILessonUserStatus) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeletePreviewUser: (id: string) => void
  closeAllUsersPreview: () => void
  previewUsers: ILessonUserStatus[]
  draggableConfig: DraggableBlockConfig | null
}

export const useNavPanel = (
  wrapperListenerRef: RefObject<HTMLDivElement | null>
): UseNavPanelReturn => {
  const drawerRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [previewUsers, setPreviewUsers] = useState<ILessonUserStatus[]>([])
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null)

  const rootSocket = useSelector((state) => state.codePanelGlobal.socket)

  const onAddBlock = (user: ILessonUserStatus): void => {
    const newPreviewedUsers = [...previewUsers]
    const isMaxBlocksInView = newPreviewedUsers.length === draggableConfig?.blockAmount
    const isExist = newPreviewedUsers.some(({ id }) => id === user.id)

    if (isExist) {
      return
    }

    if (isMaxBlocksInView) {
      newPreviewedUsers.splice(newPreviewedUsers.length - 1, 1)
      setPreviewUsers([...newPreviewedUsers, user])

      return
    }

    if (rootSocket) {
      rootSocket.emit(SocketEventsStudentMode.InitOnlineMode, { roomId: user.id })
    }

    setPreviewUsers([...newPreviewedUsers, user])
  }

  const onDeletePreviewUser = (_id: string): void => {
    const index = previewUsers.findIndex(({ id }) => id === _id)

    if (index > -1) {
      const newPreviewUsers = [...previewUsers]
      newPreviewUsers.splice(index, 1)
      setPreviewUsers(newPreviewUsers)
    }
  }

  const closeAllUsersPreview = () => {
    setPreviewUsers([])
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over != null && active != null && active.id !== over.id) {
      setPreviewUsers((items) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id)
        const newIndex = items.findIndex(({ id }) => id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  useEffect(() => {
    let resizeObserver: ResizeObserver

    if (wrapperListenerRef.current != null) {
      resizeObserver = new ResizeObserver(([{ contentRect }]) => {
        const config = getDraggableBlockConfig(contentRect)

        setDraggableConfig(config)
        setPreviewUsers((prev) =>
          config.blockAmount < prev.length ? prev.slice(0, config.blockAmount) : prev
        )
      })

      resizeObserver.observe(wrapperListenerRef.current)
    }

    return () => {
      if (wrapperListenerRef.current != null) {
        resizeObserver?.unobserve(wrapperListenerRef.current)
      }
    }
  }, [wrapperListenerRef])

  return {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    closeAllUsersPreview,
    previewUsers,
    draggableConfig,
  }
}
