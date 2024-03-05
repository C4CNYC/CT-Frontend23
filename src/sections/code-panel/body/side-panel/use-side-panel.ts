import {
  Dispatch,
  type MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useFilters } from '@/hooks/useFilters'
import { useGetFriendsStudentContentQuery } from '@/redux/services/manager/friends-manager'
import { useSelector } from '@/redux/store'
import { UserWithStatusAndStudent } from '@/sections/code-panel/lib/types'

import { type DraggableBlockConfig, getDraggableBlockConfig } from './utils'

interface UseSidePanelReturn {
  drawerRef: MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (user: UserWithStatusAndStudent) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeletePreviewUser: (id: string) => void
  previewUsers: UserWithStatusAndStudent[]
  draggableConfig: DraggableBlockConfig | null
  users: UserWithStatusAndStudent[]
  setUsers: Dispatch<SetStateAction<UserWithStatusAndStudent[]>>
  activeUsersAmount: number
  isUsersLoading: boolean
  onLoadMore: () => void
  hasNextPage: boolean
}

const DEFAULT_FILTERS = { take: 50, page: 1 }
const FILTER_NAME = 'page'

export const useSidePanel = (
  wrapperListenerRef: RefObject<HTMLDivElement | null>
): UseSidePanelReturn => {
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewUsers, setPreviewUsers] = useState<UserWithStatusAndStudent[]>([])
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null)
  const classId = useSelector((state) => state?.codePanel?.class?.id)
  const { filters, setFilter } = useFilters(DEFAULT_FILTERS)
  const [users, setUsers] = useState<UserWithStatusAndStudent[]>([])

  const { data: availableStudents, isLoading: isAvailableUsersLoading } =
    useGetFriendsStudentContentQuery(filters)

  useEffect(() => {
    setFilter('class_id', classId as string)
  }, [classId])

  const onLoadMore = () => {
    if (!availableStudents?.meta?.hasNextPage) {
      return
    }

    setFilter(FILTER_NAME, availableStudents.meta.page + 1)
  }

  const onAddBlock = (user: UserWithStatusAndStudent): void => {
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

  useEffect(() => {
    setUsers((prev) => [
      ...prev,
      ...(availableStudents?.data
        ? availableStudents?.data.map((student) => {
            return {
              ...student.account,
              student,
              status: 'inactive',
            } as UserWithStatusAndStudent
          })
        : []),
    ])
  }, [availableStudents?.data])

  const { activeUsersAmount, sortedUsers } = useMemo(() => {
    const statusOrder: Record<string, number> = {
      active: 1,
      idle: 2,
      inactive: 3,
    }
    const sortedUsers = users
    const activeUsersAmount = users.filter(({ status }) => status !== 'inactive').length
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
    hasNextPage: availableStudents?.meta.hasNextPage ?? false,
  }
}
