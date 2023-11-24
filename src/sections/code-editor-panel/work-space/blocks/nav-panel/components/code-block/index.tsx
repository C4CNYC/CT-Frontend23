import { type FC, useMemo } from "react";

import { type DraggableAttributes } from "@dnd-kit/core";
import { type SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useDispatch } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Avatar, Box, Stack, Typography } from "@mui/material";

import { type BaseResponseInterface } from "@utils";
import OpenCodeIcon from "src/assets/icons/OpenCodeIcon";
import CodeEditorCollab from "src/components/code-editor-collab";
import { EditorMode } from "src/components/code-editor-collab/hook/constants";
import { type IFriend } from "src/redux/interfaces/friends.interface";
import { setRoom } from "src/redux/slices/code-editor-controller";

import { getRandomIndex } from "../../hook/utils";
import { BOX_COLORS, HEADER_COLORS } from "./constants";
import styles from "./styles";

interface CodeBlockProps {
  onClose: () => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  data: IFriend & BaseResponseInterface;
}

const CodeBlock: FC<CodeBlockProps> = ({
  onClose,
  attributes,
  listeners,
  data,
}) => {
  const dispatch = useDispatch();
  const { boxColor, headerColor } = useMemo(
    () => ({
      boxColor: BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0],
      headerColor:
        HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0],
    }),
    []
  );
  const boxSx = useMemo(() => styles.getBoxSx(boxColor), [boxColor]);
  const headerSx = useMemo(
    () => styles.getHeaderSx(headerColor),
    [headerColor]
  );
  const onOpenCode = () => {
    dispatch(
      setRoom({
        roomId: data.id,
        cursorText: data.first_name,
        mode: EditorMode.SubOwner,
      })
    );
  };

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
          <OpenCodeIcon onClick={onOpenCode} sx={styles.OPEN_CODE_ICON} />

          <CloseIcon sx={styles.CLOSE_ICON_SX} onClick={onClose} />
        </Stack>
      </Stack>

      <CodeEditorCollab
        roomId={data.id}
        userId={data.id}
        isReadOnly
        mode={EditorMode.Watcher}
        withFileManager={false}
      />
    </Box>
  );
};

export default CodeBlock;
