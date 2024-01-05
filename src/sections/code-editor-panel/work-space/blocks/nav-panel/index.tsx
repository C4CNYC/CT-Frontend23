import { type FC, type RefObject, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { DndContext } from '@dnd-kit/core';
import { useRouter } from "next/router";
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

import { type BaseResponseInterface } from "@utils";
import { type IFriend } from "src/redux/interfaces/friends.interface";
import { RootState } from "src/redux/store";
import { useSocket, useLessonStatus } from "@hooks";
import { ILessonUserStatus } from "@types";

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
    setUsers,
    previewdUsers,
    isCodePreviewVisible,
    activeUsersAmount,
    isCodeBlocksVisible,
    isUsersLoading,
    onLoadMore,
    hasNextPage
  } = useNavPanel(wrapperListenerRef);


  const router = useRouter();
  const socket = useSocket();
  const usersStatus = useLessonStatus();
  console.log("socket navpanel:", socket);
  const room = useSelector((state: RootState) => state.codeEditorController.room);
  const roomId = room?.roomId || '';

  const drawerSx = useMemo(() => {
    return getDrawerSx(isOpen, isCodePreviewVisible)
  }, [isOpen, isCodePreviewVisible]);

  const stackCodeBoxSx = useMemo(() => {
    return getStackCodeBoxSx(draggableConfig?.height, isOpen);
  }, [draggableConfig?.height, isOpen]);

  useEffect(() => {
    console.log({ users });
  }, [users])

  useEffect(() => {
    console.log({ usersStatus })
    const _users = users.map((_user: IFriend & BaseResponseInterface) => {
      if (!usersStatus.some((_userStatus: ILessonUserStatus) => _userStatus.id === _user.id)) {
        return {
          ..._user
        }
      } else {
        return {
          ..._user,
          status: usersStatus.filter((_userStatus: ILessonUserStatus) => _userStatus.id === _user.id)[0].status
        }
      }
    });
    setUsers(_users);
  }, [usersStatus, users.length])

  useEffect(() => {
    console.log("second component:", socket);
    socket.on("joinLesson_", (data: any) => {
      console.log("joinLesson_ response");
      const { lesson, user } = JSON.parse(data);
      console.log("joinLesson:", { lesson, user });
    });
    socket.on("leaveLesson_", (data: any) => {
      const [lesson, user] = JSON.parse(data);
      console.log({ lesson, user });
    });
    return () => {
      socket.off("joinLesson_");
      socket.off("leaveLesson_");
    };
  }, []);

  const onChangeUserStatus = (status: string = 'active') => {
    try {
      console.log(socket);
      console.log({ roomId });
      console.log("onChangeUserStatus", router.query.lessonId);
      // if (socket && socket.connected && router.query.lessonId) {
      socket.emit('changeStatusInLesson', { lesson: router.query.lessonId, user: roomId, status });
      // }
      setUsers((_users: (IFriend & BaseResponseInterface)[]) => _users.map((_user: IFriend & BaseResponseInterface) => {
        if (_user.id === roomId)
          return { ..._user, status }
        return { ..._user }
      }))

    } catch (error) {
      console.log("onChangeUserStatusError: ", error);

    }

  }

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
                {users.map((user, index) => (
                  <NavItem
                    key={`${user.id}-${index}`}
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
                      onChangeUserStatus={(status) => onChangeUserStatus(status)}
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
