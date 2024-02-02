import { Dispatch, type MutableRefObject, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react"

import { type DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

import { useFilters } from "src/lib/hooks/useFilters"
import { BaseResponseInterface } from "src/lib/utils/baseResponse.interface"
import { IFriend } from "src/redux/interfaces/friends.interface"
import { useGetFriendsStudentContentQuery } from "src/redux/services/manager/friends-manager"
import { useSelector } from "src/redux/store"

import { type DraggableBlockConfig, getDraggableBlockConfig } from "./utils"

type FriendUser = IFriend & BaseResponseInterface

interface UseNavPanelReturn {
  drawerRef: MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (user: FriendUser) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeletePreviewUser: (id: string) => void
  previewUsers: FriendUser[]
  draggableConfig: DraggableBlockConfig | null
  users: FriendUser[]
  setUsers: Dispatch<SetStateAction<FriendUser[]>>
  activeUsersAmount: number
  isUsersLoading: boolean
  onLoadMore: () => void
  hasNextPage: boolean
}

const DEFAULT_FILTERS = { take: 50, page: 1 }
const FILTER_NAME = "page"

export const useNavPanel = (wrapperListenerRef: RefObject<HTMLDivElement | null>): UseNavPanelReturn => {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewUsers, setPreviewUsers] = useState<FriendUser[]>([])
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null)
  const classId = useSelector((state) => state?.codePanel?.class?.id)
  const { filters, setFilter } = useFilters(DEFAULT_FILTERS)
  const [users, setUsers] = useState<FriendUser[]>([])

  const { data: availableUsers, isLoading: isAvailableUsersLoading } = useGetFriendsStudentContentQuery(filters)

  useEffect(() => {
    setFilter("class_id", classId as string)
  }, [classId])

  const onLoadMore = () => {
    if (!availableUsers?.meta?.hasNextPage) {
      return
    }

    setFilter(FILTER_NAME, availableUsers.meta.page + 1)
  }

  const onAddBlock = (user: FriendUser): void => {
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
        setPreviewUsers((prev) => (config.blockAmount < prev.length ? prev.slice(0, config.blockAmount) : prev))
      })

      resizeObserver.observe(wrapperListenerRef.current)
    }

    return () => {
      if (wrapperListenerRef.current != null) {
        resizeObserver?.unobserve(wrapperListenerRef.current)
      }
    }
  }, [wrapperListenerRef])

  useEffect(() => {
    if (availableUsers?.data != null) {
      setUsers((prev) => [
        ...prev,
        ...availableUsers.data.map((_user) => (_user.status ? _user : { ..._user, status: "inactive" })),
      ])
    }
  }, [availableUsers?.data])

  const { activeUsersAmount, sortedUsers } = useMemo(() => {
    const statusOrder: Record<string, number> = {
      active: 1,
      idle: 2,
      inactive: 3,
    }
    const sortedUsers = users
    const activeUsersAmount = users.filter(({ status }) => status !== "inactive").length
    sortedUsers.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])

    return { activeUsersAmount, sortedUsers }
  }, [users])

  return {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    previewUsers,
    draggableConfig,
    activeUsersAmount,
    users: sortedUsers,
    setUsers,
    isUsersLoading: isAvailableUsersLoading,
    onLoadMore,
    hasNextPage: availableUsers?.meta.hasNextPage ?? false,
  }
}
