import { type FC, type RefObject, useMemo } from "react";

import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import EventNoteIcon from "@mui/icons-material/EventNote";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import { CircularProgress, Divider, Drawer, List, Stack } from "@mui/material";

import { SimpleInfiniteList } from "@components";
import { useTranslate } from "src/utils/translateHelper";

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

interface NavPanelProps {
  cursorName?: string;
  wrapperListenerRef: RefObject<HTMLDivElement | null>;
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
    hasNextPage,
  } = useNavPanel(wrapperListenerRef);

  const translate = useTranslate();
  const drawerSx = useMemo(() => {
    return getDrawerSx(isOpen, isCodePreviewVisible);
  }, [isOpen, isCodePreviewVisible]);

  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen);
  }, [draggableConfig?.height, isOpen]);

  return (
    <Drawer ref={drawerRef} open={isOpen} variant="permanent" sx={drawerSx}>
      <HeaderItem
        activeUsers={activeUsersAmount}
        onClick={() => setIsOpen(!isOpen)}
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
                <CircularProgress color="primary" size={LOADER_SIZE} />
              }
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
          )}
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX_BOTTOM} />

      <List sx={LIST_SX}>
        <CutomNavItem
          isDisabled={true}
          icon={<SpeakerNotesOutlinedIcon sx={ICON_SX} />}
          name={translate("group_chat")}
          onToggle={() => {
            setIsOpen(!isOpen);
          }}
        />
        <CutomNavItem
          isDisabled={true}
          icon={<EventNoteIcon sx={ICON_SX} />}
          name={translate("notes")}
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
                      onClose={() => onDeletePreviewUser(user.id)}
                      data={user}
                      cursorName={cursorName}
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
