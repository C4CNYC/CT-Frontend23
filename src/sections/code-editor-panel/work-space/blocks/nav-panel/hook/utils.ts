import { BOX_HEIGHT } from "../components/code-block/constants";

export const getRandomIndex = (maxInt: number): number => {
  const randomIndex = Math.floor(Math.random() * maxInt + 1)

  return randomIndex - 1;
}

export interface DraggableBlockConfig {
  height: number,
  blockAmount: number
}

const DRAGGABLE_BLOCK_COLUMNS = 2;
const COLUMN_GAP = 12;

export const getDraggableBlockConfig = (height: number): DraggableBlockConfig => {
  return {
    height,
    blockAmount: Math.floor((height - COLUMN_GAP) / (BOX_HEIGHT + COLUMN_GAP)) * DRAGGABLE_BLOCK_COLUMNS
  }
}
