import { type FC, useMemo } from "react";

import {
  Drawer,
  List,
  Divider,
  Stack
} from "@mui/material";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentIcon from "@mui/icons-material/Assignment";

import NavItem from "./components/nav-item";
import HeaderItem from "./components/header-item";
import CutomNavItem from "./components/custom-nav-item";
import CodeBlock from "./components/code-block";

import {
  ICON_SX,
  DIVIDER_SX,
  STACK_SX,
  MAIN_LIST,
  LIST_SX,
  getDrawerSx,
  getStackCodeBoxSx
} from "./styles"

import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "./components/sortable-item";
import { useNavPanel } from "./hook";
import { MOCK } from "./hook/mock";
import { useRoomActivity } from "@hooks";
import { useRouter } from "next/router";

const NavPanel: FC = () => {
  const {
    drawerRef,
    isOpen,
    onAddBlock,
    setBlocks,
    setIsOpen,
    onDragEnd,
    onDeleteBlock,
    blocks,
    draggableConfig
  } = useNavPanel();

  const { query } = useRouter();

  const drawerSx = useMemo(() => getDrawerSx(isOpen), [isOpen]);
  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height)
  }, [draggableConfig?.height]);

  const isBlocksVisible = blocks.length > 0 && isOpen && draggableConfig != null;

  const { getActivityStatus } = useRoomActivity(query.lessonId as string | undefined);

  return (
    <Drawer
      ref={drawerRef}
      open={isOpen}
      variant="permanent"
      sx={drawerSx}
    >
      <HeaderItem
        onClick={() => {
          setIsOpen(!isOpen);
          setBlocks([])
        }}
      />

      <Divider sx={DIVIDER_SX} />

      <Stack sx={STACK_SX}>
        <List sx={MAIN_LIST}>
          {MOCK.map((props) => (
            <NavItem
              key={props.name}
              {...props}
              status={getActivityStatus(props.id)}
              onToggle={() => { setIsOpen(!isOpen); }}
              onClick={() => { onAddBlock(props.id); }}
            />
          ))}
        </List>
      </Stack>

      <Divider sx={DIVIDER_SX} />

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

      {isBlocksVisible && (
        <Stack sx={stackCodeBoxSx}>
          <DndContext
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={blocks}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((id) => {
                return (
                  <SortableItem key={id} id={id}>
                    <CodeBlock onClose={() => { onDeleteBlock(id); }} id={id} key={id} />
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
