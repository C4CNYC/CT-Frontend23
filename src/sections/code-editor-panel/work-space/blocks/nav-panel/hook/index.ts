import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
  type DraggableBlockConfig,
  getDraggableBlockConfig
} from "./utils";

interface UseNavPanelReturn {
  drawerRef:  MutableRefObject<HTMLDivElement | null>
  isOpen: boolean
  onAddBlock: (block: string) => void
  setBlocks: (blocks: string[]) => void
  setIsOpen: (isOpen: boolean) => void
  onDragEnd: (e: DragEndEvent) => void
  onDeleteBlock: (id: string) => void 
  blocks: string[]
  draggableConfig: DraggableBlockConfig | null
}

export const useNavPanel = (): UseNavPanelReturn => {
  const [isOpen, setIsOpen] = useState(true);
  const [blocks, setBlocks] = useState<string[]>([]);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [draggableConfig, setDraggableConfig] = useState<DraggableBlockConfig | null>(null);

  const onAddBlock = (_id: string): void => {
    const newBlocks = [...blocks];
    const isMaxBlocksInView = newBlocks.length === draggableConfig?.blockAmount;

    if (isMaxBlocksInView) {
      newBlocks.pop();
      newBlocks.push(_id);
      setBlocks(newBlocks);

      return;
    }

    const isExist = newBlocks.find(id => id === _id) != null;

    if (!isExist) {
      setBlocks([...blocks, _id]);
    }
  }
  
  const onDeleteBlock = (id: string): void => {
    const index = blocks.findIndex((_id) => _id === id);

    if (index > -1) {
      const newBlocks = [...blocks]
      newBlocks.splice(index, 1)
      setBlocks(newBlocks)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const {active, over } = event;
      
      if (over != null && active != null && active.id !== over.id) {
        setBlocks((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
          
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

  return {
    drawerRef,
    isOpen,
    onAddBlock,
    setBlocks,
    setIsOpen,
    onDragEnd,
    onDeleteBlock,
    blocks,
    draggableConfig
  }
}