import { type FC, type RefObject, useMemo } from "react";
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import {
  Drawer,
  List,
  Divider,
  Stack,
  CircularProgress
} from "@mui/material";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { SimpleInfiniteList } from "@components";

import NavItem from "./components/nav-item";
import HeaderItem from "./components/header-item";
import CutomNavItem from "./components/custom-nav-item";
import CodeBlock from "./components/code-block";
import SortableItem from "./components/sortable-item";
import LoadListSkeleton from "./components/load-list-skeleton";

import {
  ICON_SX,
  DIVIDER_SX,
  STACK_SX,
  MAIN_LIST,
  LIST_SX,
  getDrawerSx,
  getStackCodeBoxSx,
  DIVIDER_SX_BOTTOM
} from "./styles"
import { useNavPanel } from "./hook";

interface NavPanelProps {
  cursorName?: string
  wrapperListenerRef: RefObject<HTMLDivElement | null>
}

const LOADER_SIZE = 20;

const NavPanel: FC<NavPanelProps> = ({ cursorName, wrapperListenerRef }) => {
  const {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    draggableConfig,
    users,
    previewdUsers,
    isCodePreviewVisible,
    activeUsersAmount,
    isCodeBlocksVisible,
    isUsersLoading,
    onLoadMore,
    hasNextPage
  } = useNavPanel(wrapperListenerRef);

  const drawerSx = useMemo(() => {
    return getDrawerSx(isOpen, isCodePreviewVisible)
  }, [isOpen, isCodePreviewVisible]);

  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen);
  }, [draggableConfig?.height, isOpen]);

  return (
    <Drawer
      ref={drawerRef}
      open={isOpen}
      variant="permanent"
      sx={drawerSx}
    >
      <HeaderItem
        activeUsers={activeUsersAmount}
        onClick={() => setIsOpen(!isOpen)}
      />

      <Divider sx={DIVIDER_SX} />

      <Stack sx={STACK_SX}>
        <List sx={MAIN_LIST}>
          {isUsersLoading
            ? <LoadListSkeleton />
            : (
              <SimpleInfiniteList
                loading={isUsersLoading}
                hasNextPage={hasNextPage}
                onLoadMore={onLoadMore}
                loaderComponent={<CircularProgress color="primary" size={LOADER_SIZE} />}
              >
                {users.map((user) => (
                  <NavItem
                    key={user.id}
                    data={user}
                    onToggle={() => setIsOpen(!isOpen)}
                    onClick={() => onAddBlock(user)}
                  />
                ))}
              </SimpleInfiniteList>
            )
          }
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX_BOTTOM} />
      
      <List sx={LIST_SX}>
        <CutomNavItem
          icon={<SpeakerNotesOutlinedIcon sx={ICON_SX} />}
          name="Group Chat"
          onToggle={() => { setIsOpen(!isOpen); }}
        />

        <CutomNavItem
          icon={<EventNoteIcon sx={ICON_SX} />}
          name="Notes"
          onToggle={() => { setIsOpen(!isOpen); }}
        />

        <CutomNavItem
          icon={<AssignmentIcon sx={ICON_SX} />}
          name="Sandbox"
          onToggle={() => { setIsOpen(!isOpen); }}
        />
      </List>

      {isCodeBlocksVisible && (
        <Stack sx={stackCodeBoxSx}>
          <DndContext onDragEnd={onDragEnd}>
            <SortableContext 
              items={previewdUsers}
              strategy={verticalListSortingStrategy}
            >
              {previewdUsers.map((user) => {
                return (
                  <SortableItem key={user.id} id={user.id}>
                    <CodeBlock
                      onClose={() => onDeletePreviewUser(user.id)}
                      data={user}
                      cursorName={cursorName}
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

export default NavPanel;
