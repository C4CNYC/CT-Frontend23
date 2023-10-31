import { useMemo, type FC } from "react";

import { Box, Stack, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import OpenCodeIcon from "src/assets/icons/OpenCodeIcon"

import { getRandomIndex } from "../../hook/utils";
import { getAvatarSx, getBoxSx, getHeaderSx, DRAG_INDICATOR_SX, TYP_NAME_SX, CLOSE_ICON_SX, OPEN_CODE_ICON } from "./constants"
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { CodeEditor } from "src/components/real-time-editor/editor";
import { EXAMPLE_CODE, LOADING_CODE } from "../../hook/mock";

interface CodeBlockProps {
  id: string
  onClose: () => void
  attributes?:  DraggableAttributes
  listeners?: SyntheticListenerMap
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
const AVATAR_COLORS = ["#155275", "rgba(120, 56, 121, 0.80)", "#EE467A"]

const CodeBlock: FC<CodeBlockProps> = ({ id, onClose, attributes, listeners }) => {
  const {
    boxColor,
    headerColor,
    avatarColor
  } = useMemo(() => ({
    boxColor: BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0],
    headerColor: HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0],
    avatarColor: AVATAR_COLORS[getRandomIndex(AVATAR_COLORS.length)] ?? AVATAR_COLORS[0]
  }), []);
  const boxSx = useMemo(() => getBoxSx(boxColor), [boxColor]);
  const headerSx = useMemo(() => getHeaderSx(headerColor), [headerColor]);
  const avatarSx = useMemo(() => getAvatarSx(avatarColor), [avatarColor])

  return (
    <Box sx={boxSx}>
      <Stack direction="row" justifyContent="space-between" sx={headerSx}>
        <Stack alignItems="center" direction="row" height="100%">
          <DragIndicatorIcon
            sx={DRAG_INDICATOR_SX}
            {...attributes}
            {...listeners}
          />
          <Avatar sx={avatarSx}>OF</Avatar>

          <Typography sx={TYP_NAME_SX}>
            Ole Lukoe
          </Typography>
        </Stack>

        <Stack alignItems="center" direction="row" height="100%">
          <OpenCodeIcon sx={OPEN_CODE_ICON} />

          <CloseIcon sx={CLOSE_ICON_SX} onClick={onClose} />
        </Stack>
      </Stack>

      <Stack alignItems="center" justifyContent="center" sx={{ position: "absolute", width: "100%", height: "100%", fontSize: "22px" }}>
        Loading code.....
      </Stack>

      <CodeEditor
        code={EXAMPLE_CODE}
        onChangeCode={() => {}}
        preloadedCode={LOADING_CODE}
      />
    </Box>
  )
}

export default CodeBlock;
