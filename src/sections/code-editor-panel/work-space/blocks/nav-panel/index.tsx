import { useRouter } from "next/router";
import { type FC, useMemo } from "react";

import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import { Divider, Drawer, List, Stack } from "@mui/material";

import { useRoomActivity } from "@hooks";

import CodeBlock from "./components/code-block";
import CutomNavItem from "./components/custom-nav-item";
import HeaderItem from "./components/header-item";
import LoadListSkeleton from "./components/load-list-skeleton";
import NavItem from "./components/nav-item";
import SortableItem from "./components/sortable-item";
import { useNavPanel } from "./hook";
import {
  DIVIDER_SX,
  DIVIDER_SX_BOTTOM,
  ICON_SX,
  LIST_SX,
  MAIN_LIST,
  STACK_SX,
  getDrawerSx,
  getStackCodeBoxSx,
} from "./styles";

const NavPanel: FC = () => {
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
  } = useNavPanel();

  const { query } = useRouter();

  const drawerSx = useMemo(
    () => getDrawerSx(isOpen, isCodePreviewVisible),
    [isOpen, isCodePreviewVisible]
  );
  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen);
  }, [draggableConfig?.height, isOpen]);

  const { getActivityStatus } = useRoomActivity(
    query.lessonId as string | undefined
  );

  return (
    <Drawer ref={drawerRef} open={isOpen} variant="permanent" sx={drawerSx}>
      <HeaderItem
        activeUsers={activeUsersAmount}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />

      <Divider sx={DIVIDER_SX} />

      <Stack sx={STACK_SX}>
        <List sx={MAIN_LIST}>
          {isUsersLoading ? (
            <LoadListSkeleton />
          ) : (
            <>
              {users.map((user) => (
                <NavItem
                  key={user.id}
                  data={user}
                  status={getActivityStatus(user.id)}
                  onToggle={() => {
                    setIsOpen(!isOpen);
                  }}
                  onClick={() => {
                    onAddBlock(user);
                  }}
                />
              ))}
            </>
          )}
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX_BOTTOM} />

      <List sx={LIST_SX}>
        <CutomNavItem
          icon={<SpeakerNotesOutlinedIcon sx={ICON_SX} />}
          name="Group Chat"
          onToggle={() => {
            setIsOpen(!isOpen);
          }}
        />

        <CutomNavItem
          icon={<EventNoteIcon sx={ICON_SX} />}
          name="Notes"
          onToggle={() => {
            setIsOpen(!isOpen);
          }}
        />

        <CutomNavItem
          icon={<AssignmentIcon sx={ICON_SX} />}
          name="Sandbox"
          onToggle={() => {
            setIsOpen(!isOpen);
          }}
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
                      onClose={() => {
                        onDeletePreviewUser(user.id);
                      }}
                      data={user}
                    />
                  </SortableItem>
                );
              })}
            </SortableContext>
          </DndContext>
        </Stack>
      )}
    </Drawer>
  );
};

export default NavPanel;
