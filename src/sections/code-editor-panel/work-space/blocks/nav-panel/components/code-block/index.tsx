import { useMemo, type FC } from "react";

import { Box, Stack, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import OpenCodeIcon from "src/assets/icons/OpenCodeIcon"

import { type DraggableAttributes } from "@dnd-kit/core";
import { type SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { type IFriend } from "src/redux/interfaces/friends.interface";
import { type BaseResponseInterface } from "@utils";

import { getRandomIndex } from "../../hook/utils";
import { BOX_COLORS, HEADER_COLORS } from "./constants"
import CodeEditorCollab from "src/components/code-editor-collab";

import styles from "./styles"
import { EditorMode } from "src/components/code-editor-collab/hook";

interface CodeBlockProps {
  onClose: () => void
  attributes?:  DraggableAttributes
  listeners?: SyntheticListenerMap
  data: IFriend & BaseResponseInterface
}

const CodeBlock: FC<CodeBlockProps> = ({ onClose, attributes, listeners, data }) => {
  const {
    boxColor,
    headerColor
  } = useMemo(() => ({
    boxColor: BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0],
    headerColor: HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0]
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

          <Avatar sx={styles.AVATAR_SX} src={data.avatar} />

          <Typography sx={styles.TYP_NAME_SX}>
            {data.first_name} {data.last_name}
          </Typography>
        </Stack>

        <Stack alignItems="center" direction="row" height="100%">
          <OpenCodeIcon sx={styles.OPEN_CODE_ICON} />

          <CloseIcon sx={styles.CLOSE_ICON_SX} onClick={onClose} />
        </Stack>
      </Stack>

      <CodeEditorCollab
        roomId={data.id}
        isReadOnly
        mode={EditorMode.Watcher}
      />
    </Box>
  )
}

export default CodeBlock;
