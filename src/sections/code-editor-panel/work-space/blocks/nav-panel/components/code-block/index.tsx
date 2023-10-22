import { useMemo, type FC } from "react";

import { Box, Stack, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { type DraggableAttributes } from "@dnd-kit/core";
import { type SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import OpenCodeIcon from "src/assets/icons/OpenCodeIcon";
import CodeEditorCollab from "src/components/code-editor-collab";

import { getRandomIndex } from "../../hook/utils";

import styles from "./styles"
import { EditorMode } from "src/components/code-editor-collab/hook";

interface CodeBlockProps {
  id: string
  onClose: () => void
  attributes?: DraggableAttributes
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

const CodeBlock: FC<CodeBlockProps> = ({ id, onClose, attributes, listeners }) => {
  const {
    boxColor,
    headerColor,
  } = useMemo(() => ({
    boxColor: BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0],
    headerColor: HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0],
  }), []);
  const boxSx = useMemo(() => styles.getBoxSx(boxColor), [boxColor]);
  const headerSx = useMemo(() => styles.getHeaderSx(headerColor), [headerColor]);

  return (
    <Box sx={boxSx}>
      <Stack direction="row" justifyContent="space-between" sx={headerSx}>
        <Stack alignItems="center" direction="row" height="100%">
          <DragIndicatorIcon
            sx={styles.DRAG_INDICATOR_SX}
            {...attributes}
            {...listeners}
          />
          <Avatar sx={styles.AVATAR_SX}>OF</Avatar>

          <Typography sx={styles.TYP_NAME_SX}>
            Ole Lukoe
          </Typography>
        </Stack>

        <Stack alignItems="center" direction="row" height="100%">
          <OpenCodeIcon sx={styles.OPEN_CODE_ICON} />

          <CloseIcon sx={styles.CLOSE_ICON_SX} onClick={onClose} />
        </Stack>
      </Stack>

      <CodeEditorCollab
        roomId={id}
        isReadOnly
        mode={EditorMode.Watcher}
      />
    </Box>
  )
}

export default CodeBlock;
