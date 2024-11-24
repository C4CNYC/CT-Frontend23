import { useEffect, useMemo, useState } from 'react'

import { useFilters } from '@root/src/hooks'
import { useGetFriendsStudentContentQuery } from '@root/src/redux/services/manager/friends-manager'
import { useSelector } from '@root/src/redux/store'
import { ILessonUserStatus } from '@root/src/types'

const FILTER_NAME = 'page'
const DEFAULT_FILTERS = { take: 50, page: 1 }

interface LessonUserResponseType {
  id: string
  status: string
  lessonId: string
}

export const useUserWithStatuses = () => {
  const [users, setUsers] = useState<Array<ILessonUserStatus>>([])
  const { filters, setFilter } = useFilters(DEFAULT_FILTERS)

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const classId = useSelector((state) => state?.codePanel?.class?.id)

  const { data: availableUsers, isLoading: isUsersLoading } =
    useGetFriendsStudentContentQuery(filters)

  useEffect(() => {
    if (!socket) return

    socket.on('lessonMembers', (data: { participants: LessonUserResponseType[] }) => {
      const { participants } = data
      setUsers((_usersStatus: ILessonUserStatus[]) =>
        _usersStatus.map((_status) => {
          const participant = participants.find((_participant) => _participant.id === _status.id)
          if (!participant) return _status
          return {
            ..._status,
            status: participant.status,
            lessonId: participant.lessonId,
          }
        })
      )
    })

    return () => {
      socket?.off('lessonMembers')
    }
  }, [socket, users])

  useEffect(() => {
    if (!availableUsers) return

    const _users = availableUsers.data.map((_user) => {
      const userStatus = users.find((_userStatus: ILessonUserStatus) => _userStatus.id === _user.id)
      return {
        ..._user,
        status: userStatus?.status ?? 'inactive',
        currentLessonId: userStatus?.lessonId ?? _user.currentLessonId,
      }
    })

    setUsers(_users as unknown as ILessonUserStatus[])
  }, [availableUsers])

  useEffect(() => {
    setFilter('class_id', classId as string)
  }, [classId])

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

  const onLoadMore = () => {
    if (!availableUsers?.meta?.hasNextPage) {
      return
    }

    setFilter(FILTER_NAME, availableUsers.meta.page + 1)
  }

  return {
    users: sortedUsers,
    activeUsersAmount,
    isUsersLoading,
    onLoadMore,
    hasNextPage: availableUsers?.meta?.hasNextPage,
  }
}
