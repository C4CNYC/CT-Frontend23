import { type FC, type RefObject, useEffect, useMemo } from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined'
import { CircularProgress, Divider, Drawer, List, Stack } from '@mui/material'

import { SimpleInfiniteList } from '@/components'
import { type IFriend } from '@/redux/interfaces/friends.interface'
import { useSelector } from '@/redux/store'
import { ILessonUserStatus } from '@/types'
import { type BaseResponseInterface } from '@/utils'

import CodePreview from './code-preview'
import CustomNavItem from './custom-nav-item'
import HeaderItem from './header-item'
import LoadListSkeleton from './load-list-skeleton'
import SortableItem from './sortable-item'
import {
  DIVIDER_SX,
  DIVIDER_SX_BOTTOM,
  ICON_SX,
  LIST_SX,
  MAIN_LIST,
  STACK_SX,
  getDrawerSx,
  getStackCodeBoxSx,
} from './styles'
import { useSidePanel } from './use-side-panel'
import UserItem from './user-item'

interface SidePanelProps {
  cursorName?: string
  wrapperListenerRef: RefObject<HTMLDivElement | null>
  lessonId?: string
}

const LOADER_SIZE = 20

const SidePanel: FC<SidePanelProps> = ({ cursorName, wrapperListenerRef, lessonId }) => {
  const {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    draggableConfig,
    users,
    setUsers,
    previewUsers,
    activeUsersAmount,
    isUsersLoading,
    onLoadMore,
    hasNextPage,
  } = useSidePanel(wrapperListenerRef)

  const isRealtimeCodeEnabled = useSelector((state) => state.codePanelGlobal.isRealtimeCodeEnabled)
  const isRealtimeCodeHidden = useSelector((state) => state.codePanelGlobal.isRealtimeCodeHidden)

  // const socket = useSelector((state) => state.codePanelGlobal.socket)
  const usersStatus = useSelector((state) => state.codePanelGlobal.usersStatus)
  // const room = useSelector((state: RootState) => state.codeEditorController.room)
  // const roomId = room?.roomId ?? ''

  const drawerSx = useMemo(() => {
    return getDrawerSx(isOpen, isRealtimeCodeHidden)
  }, [isOpen, isRealtimeCodeHidden])

  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen)
  }, [draggableConfig?.height, isOpen])

  useEffect(() => {
    // console.log({ usersStatus });
    const _users = users.map((_user: IFriend & BaseResponseInterface) => {
      const userStatus = usersStatus.find(
        (_userStatus: ILessonUserStatus) => _userStatus.id === _user.id
      )
      return {
        ..._user,
        status: userStatus?.status ?? _user.status,
        currentLessonId: userStatus?.lessonId ?? _user.currentLessonId,
      }
    })
    setUsers(_users)
  }, [usersStatus, users.length])

  // const onChangeUserStatus = (status: string, lessonId: string) => {
  //   try {
  //     socket?.emit('changeStatusInLesson', {
  //       lesson: lessonId,
  //       user: roomId,
  //       status,
  //     })
  //     setUsers((_users: IFriend[]) =>
  //       _users.map((_user: IFriend) => {
  //         if (roomId === `${_user.id as string}_${lessonId as string}`) return { ..._user, status }
  //         return { ..._user }
  //       })
  //     )
  //   } catch (error: any) {
  //     // eslint-disable-next-line no-console
  //     console.log('onChangeUserStatusError: ', error)
  //   }
  // }

  return (
    <Drawer
      ref={drawerRef}
      open={isOpen}
      variant='permanent'
      sx={drawerSx}
    >
      <HeaderItem
        activeUsers={activeUsersAmount}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        isOpen={isOpen}
      />

      <Divider sx={DIVIDER_SX} />

      <Stack sx={STACK_SX}>
        <List sx={MAIN_LIST}>
          {isUsersLoading ? (
            <LoadListSkeleton />
          ) : (
            <SimpleInfiniteList
              loading={isUsersLoading}
              hasNextPage={hasNextPage}
              onLoadMore={onLoadMore}
              loaderComponent={
                <CircularProgress
                  color='primary'
                  size={LOADER_SIZE}
                />
              }
            >
              {users.map((user, index) => (
                <UserItem
                  key={`${user.id}-${index}`}
                  user={user}
                  onToggle={() => {
                    setIsOpen(!isOpen)
                  }}
                  onClick={() => {
                    onAddBlock(user)
                  }}
                />
              ))}
            </SimpleInfiniteList>
          )}
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX_BOTTOM} />

      <List sx={LIST_SX}>
        <CustomNavItem
          icon={<SpeakerNotesOutlinedIcon sx={ICON_SX} />}
          name='Group Chat'
          onToggle={() => {
            setIsOpen(!isOpen)
          }}
        />

        <CustomNavItem
          icon={<EventNoteIcon sx={ICON_SX} />}
          name='Notes'
          onToggle={() => {
            setIsOpen(!isOpen)
          }}
        />

        <CustomNavItem
          icon={<AssignmentIcon sx={ICON_SX} />}
          name='Sandbox'
          onToggle={() => {
            setIsOpen(!isOpen)
          }}
        />
      </List>

      {isRealtimeCodeEnabled && (
        <Stack sx={stackCodeBoxSx}>
          <DndContext onDragEnd={onDragEnd}>
            <SortableContext
              items={previewUsers}
              strategy={verticalListSortingStrategy}
            >
              {previewUsers.map((user) => {
                return (
                  <SortableItem
                    key={user.id}
                    id={user.id}
                  >
                    <CodePreview
                      onClose={() => {
                        onDeletePreviewUser(user.id)
                      }}
                      owner={user}
                      cursorName={cursorName}
                      // onChangeUserStatus={onChangeUserStatus}
                      lessonId={user.currentLessonId ?? lessonId}
                    />
                  </SortableItem>
                )
              })}
            </SortableContext>
          </DndContext>
        </Stack>
      )}
    </Drawer>
  )
}

export default SidePanel
