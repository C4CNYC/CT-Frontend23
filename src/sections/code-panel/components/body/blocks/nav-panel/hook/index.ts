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
import { Role } from '@root/src/redux/services/enums/role.enum'
import { IUser } from '@root/src/redux/services/interfaces/user.interface'

import { UserStatus } from '../../../consts'

import { type DraggableBlockConfig, getDraggableBlockConfig } from './utils'
export interface StreamUsersStatuses {
  user_id: string
  status: UserStatus
  status_reason?: string
}

interface UseNavPanelReturn {
  drawerRef: MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (user: IUser & { status: UserStatus }) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeletePreviewUser: (id: string) => void
  closeAllUsersPreview: () => void
  previewUsers: (IUser & { status: UserStatus })[]
  draggableConfig: DraggableBlockConfig | null
  users: (IUser & { status: UserStatus })[]
  setUsers: Dispatch<SetStateAction<(IUser & { status: UserStatus })[]>>
  activeUsersAmount: number
  activeAdminsAmount: number
  isUsersLoading: boolean
  onLoadMore: () => void
  hasNextPage: boolean
}

const DEFAULT_FILTERS = { take: 50, page: 1 }
const FILTER_NAME = 'page'

export const useNavPanel = (
  wrapperListenerRef: RefObject<HTMLDivElement | null>
): UseNavPanelReturn => {
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const user = useSelector((state) => state.global.user)

  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewUsers, setPreviewUsers] = useState<(IUser & { status: UserStatus })[]>([])
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null)
  const classId = useSelector((state) => state?.codePanel?.class?.id)
  const { filters, setFilter } = useFilters(DEFAULT_FILTERS)
  const [users, setUsers] = useState<(IUser & { status: UserStatus })[]>([])

  const { data: availableUsers, isLoading: isAvailableUsersLoading } =
    useGetFriendsStudentContentQuery(filters)

  useEffect(() => {
    setFilter('class_id', classId as string)
  }, [classId])

  const onLoadMore = () => {
    if (!availableUsers?.meta?.hasNextPage) {
      return
    }

    setFilter(FILTER_NAME, availableUsers.meta.page + 1)
  }

  const onAddBlock = (user: IUser & { status: UserStatus }): void => {
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

  useEffect(() => {
    if (availableUsers?.data != null) {
      // TODO: siplify this with axios
      fetch(
        `${
          process.env.NEXT_PUBLIC_CODE_STREAM_API
        }/stream-users-statuses?user_ids=${availableUsers.data.map((user) => user.id).join(',')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data: StreamUsersStatuses[]) => {
          const usersExceptMe = availableUsers.data.filter(({ id }) => id !== user?.id)
          setUsers((prev) => [
            ...prev,
            ...usersExceptMe.map((_user) => ({
              ..._user,
              status:
                data?.find(({ user_id }) => user_id === _user.id)?.status ?? UserStatus.OFFLINE,
            })),
          ])
          socket?.emit(
            'stream-users-statuses:subscribe',
            JSON.stringify(usersExceptMe.map(({ id }) => id))
          )
        })
    }
  }, [availableUsers?.data])

  const { activeUsersAmount, activeAdminsAmount, sortedUsers } = useMemo(() => {
    const statusOrder: Record<string, number> = {
      active: 1,
      idle: 2,
      inactive: 3,
    }
    const sortedUsers = users
    const activeAdminsAmount = users.filter(
      ({ role, status }) =>
        [Role.Admin, Role.Manager, Role.Student, Role.Owner].includes(role) &&
        status !== UserStatus.OFFLINE
    ).length
    const activeUsersAmount = users.filter(({ status }) => status !== UserStatus.OFFLINE).length
    sortedUsers.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])

    return { activeUsersAmount, activeAdminsAmount, sortedUsers }
  }, [users])

  useEffect(() => {
    if (socket == null) {
      return
    }

    socket.on('stream-users-statuses:status-updated', (data: StreamUsersStatuses) => {
      setUsers((prev) => {
        const userIndex = prev.findIndex(({ id }) => id === data.user_id)

        if (userIndex === -1) {
          return prev
        }

        const newUser = { ...prev[userIndex], status: data.status }

        return [...prev.slice(0, userIndex), newUser, ...prev.slice(userIndex + 1)]
      })
    })

    return () => {
      socket.off('stream-users-statuses:update')
    }
  }, [socket])

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
    activeUsersAmount,
    activeAdminsAmount,
    users: sortedUsers,
    setUsers,
    isUsersLoading: isAvailableUsersLoading,
    onLoadMore,
    hasNextPage: availableUsers?.meta.hasNextPage ?? false,
  }
}
