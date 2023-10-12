import { useMemo, type FC } from "react";

import { Box, Stack } from "@mui/material";

import { getBoxSx, getHeaderSx } from "./constants"
import { getRandomIndex } from "../utils";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface CodeBlockProps {
  id: string
  onDelete: (id: string) => void  
}

const HEADER_COLORS = [
  "rgba(56, 86, 121, 0.80)",
  "rgba(121, 56, 56, 0.80)",
  "rgba(120, 56, 121, 0.80)"
]

const BOX_COLORS = [
  "#019A77",
  "#EE467A",
  "#0F56B3",
  "#364954"
]

const CodeBlock: FC<CodeBlockProps> = ({ id, onDelete }) => {
  const {
    boxColor,
    headerColor
  } = useMemo(() => ({
    boxColor: BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0],
    headerColor: HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]
  }), []);
  const boxSx = useMemo(() => getBoxSx(boxColor), [boxColor])
  const headerSx = useMemo(() => getHeaderSx(headerColor), [headerColor])

  return (
    <Box
      onClick={() => onDelete(id)} sx={boxSx}
    >
      <Stack sx={headerSx}>
        
      </Stack>

      {id}
    </Box>
  )
}

export default CodeBlock;
