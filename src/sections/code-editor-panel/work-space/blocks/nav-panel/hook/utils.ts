import { BOX_HEIGHT, BOX_WIDTH } from "../components/code-block/styles";

export const getRandomIndex = (maxInt: number): number => {
  const randomIndex = Math.floor(Math.random() * maxInt + 1)

  return randomIndex - 1;
}

export interface DraggableBlockConfig {
  height: number,
  blockAmount: number
}

const GAP = 12;
const DRAWER_WIDTH = 280

export const getDraggableBlockConfig = ({ height, width } : ResizeObserverEntry['contentRect']): DraggableBlockConfig => {
  const columns = Math.floor((width - DRAWER_WIDTH) / (BOX_WIDTH + GAP));

  return {
    height,
    blockAmount: Math.floor((height - GAP) / (BOX_HEIGHT + GAP)) * columns
  }
}
