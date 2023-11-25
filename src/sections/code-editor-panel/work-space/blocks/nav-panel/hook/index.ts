import { type MutableRefObject, useEffect, useRef, useState, useMemo } from "react";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
  type DraggableBlockConfig,
  getDraggableBlockConfig
} from "./utils";
import { useGetFriendsStudentContentQuery } from "src/redux/services/manager/friends-manager";
import { IFriend } from "src/redux/interfaces/friends.interface";
import { BaseResponseInterface } from "@utils";
import { useSelector } from "src/redux/store";

type FriendUser = IFriend & BaseResponseInterface

interface UseNavPanelReturn {
  drawerRef:  MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (user: FriendUser) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeletePreviewUser: (id: string) => void 
  previewdUsers: FriendUser[]
  draggableConfig: DraggableBlockConfig | null
  users: FriendUser[]
  isCodePreviewVisible: boolean
  activeUsersAmount: number
  isCodeBlocksVisible: boolean
  isUsersLoading: boolean
}

const DEFAULT_USERS: FriendUser[] = []

export const useNavPanel = (): UseNavPanelReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewdUsers, setPreviewdUsers] = useState<FriendUser[]>([]);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null);
  const isCodePreviewVisible = useSelector(state => state.codePanelGlobal.isCodePreviewVisible);
  const [isCodeBlocksVisible, setIsCodeBlocksVisible] = useState(false)

  const { data, isLoading: isUsersLoading } = useGetFriendsStudentContentQuery(
    { take: 50 },
  );

  const onAddBlock = (user: FriendUser): void => {
    const newPreviewedUsers = [...previewdUsers];
    const isMaxBlocksInView = newPreviewedUsers.length === draggableConfig?.blockAmount;

    const isExist = newPreviewedUsers.some(({ id }) => id === user.id)

    if (isExist) {
      return
    }

    if (isMaxBlocksInView) {
      newPreviewedUsers.splice(newPreviewedUsers.length - 1, 1);
      setPreviewdUsers([...newPreviewedUsers, user]);

      return;
    }

    setPreviewdUsers([...newPreviewedUsers, user]);
  }
  
  const onDeletePreviewUser = (_id: string): void => {
    const index = previewdUsers.findIndex(({ id }) => id === _id);

    if (index > -1) {
      const newPreviewdUsers = [...previewdUsers];
      newPreviewdUsers.splice(index, 1);
      setPreviewdUsers(newPreviewdUsers);
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
      
      if (over != null && active != null && active.id !== over.id) {
        setPreviewdUsers((items) => {
          const oldIndex = items.findIndex(({ id }) => id === active.id);
          const newIndex = items.findIndex(({ id }) => id === over.id);
          
          return arrayMove(items, oldIndex, newIndex);
        });
      }
  }

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (drawerRef.current != null) {
      const resizeObserver = new ResizeObserver(([el]) => {
        const config = getDraggableBlockConfig(el.contentRect.height)
        setDraggableConfig(config);
      });

      resizeObserver.observe(drawerRef.current);
    }

    return () => {
      if (drawerRef.current != null && resizeObserver != null) {
        resizeObserver.unobserve(drawerRef.current);
      }
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isCodePreviewVisible) {
      setIsCodeBlocksVisible(false);
      setIsOpen(false);
    } else {
      timeout = setTimeout(() => {
        setIsCodeBlocksVisible(true)
      }, 400);
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isCodePreviewVisible])

  const users = data?.data ?? DEFAULT_USERS

  const {
    activeUsersAmount,
    sortedUsers
  } = useMemo(() => {
    const sortedUsers = [...users]
    sortedUsers.sort((a, b) => {
      return Number(b.active) - Number(a.active)
    })

    return {
      activeUsersAmount: users.filter(({ active }) => active).length,
      sortedUsers
    }
  }, [users]);

  return {
    drawerRef,
    isOpen,
    onAddBlock,
    setIsOpen,
    onDragEnd,
    onDeletePreviewUser,
    previewdUsers,
    draggableConfig,
    activeUsersAmount,
    users: sortedUsers,
    isCodePreviewVisible,
    isCodeBlocksVisible,
    isUsersLoading
  }
}