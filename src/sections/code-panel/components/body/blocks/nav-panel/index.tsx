import { type FC, type RefObject, useMemo } from 'react'

import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined'
import { CircularProgress, Divider, Drawer, List, Stack } from '@mui/material'

import { SimpleInfiniteList } from '@/components'
import { useSelector } from '@/redux/store'
import { ILessonUserStatus } from '@root/src/types'

import { createSocket } from '../code-editor-block/code-editor-collab/hook/utils/socket'

import CodeBlock from './components/code-block'
import CustomNavItem from './components/custom-nav-item'
import HeaderItem from './components/header-item'
import LoadListSkeleton from './components/load-list-skeleton'
import NavItem from './components/nav-item'
import SortableItem from './components/sortable-item'
import { useNavPanel } from './hook'
import { useUserWithStatuses } from './hook/useUserWithStatuses'
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

interface NavPanelProps {
  cursorName?: string
  wrapperListenerRef: RefObject<HTMLDivElement | null>
  lessonId?: string
}

interface CodeBlockUnitProps {
  user: ILessonUserStatus
  onDeletePreviewUser: (id: string) => void
  lessonId?: string
  cursorName?: string
}

const LOADER_SIZE = 20

const NavPanel: FC<NavPanelProps> = ({ cursorName, wrapperListenerRef, lessonId }) => {
  const {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    draggableConfig,
    previewUsers,
  } = useNavPanel(wrapperListenerRef)

  const { users, activeUsersAmount, isUsersLoading, onLoadMore, hasNextPage } =
    useUserWithStatuses()

  const isRealtimeCodeHidden = useSelector((state) => state.codePanelGlobal.isRealtimeCodeHidden)

  const drawerSx = useMemo(() => {
    return getDrawerSx(isOpen, isRealtimeCodeHidden)
  }, [isOpen, isRealtimeCodeHidden])

  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen)
  }, [draggableConfig?.height, isOpen])

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
              hasNextPage={!!hasNextPage}
              onLoadMore={onLoadMore}
              loaderComponent={
                <CircularProgress
                  color='primary'
                  size={LOADER_SIZE}
                />
              }
            >
              {users.map((user, index) => (
                <NavItem
                  key={`${user.id}-${index}`}
                  data={user}
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
      </List>
      <Stack sx={stackCodeBoxSx}>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            items={previewUsers}
            strategy={verticalListSortingStrategy}
          >
            {previewUsers.map((user) => (
              <CodeBlockUnit
                key={user.id}
                onDeletePreviewUser={onDeletePreviewUser}
                user={user}
                lessonId={lessonId}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Stack>
    </Drawer>
  )
}

const CodeBlockUnit: React.FC<CodeBlockUnitProps> = ({
  user,
  onDeletePreviewUser,
  lessonId,
  cursorName,
}: any) => {
  const portalSocket = useMemo(() => {
    return createSocket()
  }, [])

  const onCloseCodeBlock = () => {
    onDeletePreviewUser(user.id)

    if (portalSocket) {
      portalSocket.emit('leaveRoom', user.id)
    }
  }

  const onMoveToPortal = () => {
    onDeletePreviewUser(user.id)
  }

  return (
    <SortableItem
      key={user.id}
      id={user.id}
    >
      <CodeBlock
        portalSocket={portalSocket}
        cursorName={cursorName}
        lessonId={user.currentLessonId ?? lessonId}
        onClose={onCloseCodeBlock}
        onMoveToPortal={onMoveToPortal}
        owner={user}
      />
    </SortableItem>
  )
}

export default NavPanel
