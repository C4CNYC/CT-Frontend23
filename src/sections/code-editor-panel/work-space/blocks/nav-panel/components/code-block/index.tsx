import { type FC, useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { type DraggableAttributes } from "@dnd-kit/core";
import { type SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { Box, Stack, Avatar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import OpenCodeIcon from "src/assets/icons/OpenCodeIcon";
import CodeEditorCollab from "src/components/code-editor-collab";

import { type BaseResponseInterface } from "@utils";
import { type IFriend } from "src/redux/interfaces/friends.interface";
import { EditorMode } from "src/components/code-editor-collab/hook/constants";
import { setRoom } from "src/redux/slices/code-editor-controller";
import { RoomStatus } from "src/components/code-editor-collab/components/status-label";
import { createSocket, waitConnectSocket } from "src/components/code-editor-collab/hook/utils/socket";

import { BOX_COLORS, HEADER_COLORS } from "./constants"
import { getRandomIndex } from "../../hook/utils";

import styles from "./styles"

interface CodeBlockProps {
  onClose: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
  data: IFriend & BaseResponseInterface
  cursorName?: string
}

const CodeBlock: FC<CodeBlockProps> = ({
  onClose,
  attributes,
  listeners,
  data,
  cursorName
}) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [editorStatus, setEditorStatus] = useState(RoomStatus.Inactive);

  const { boxSx, headerSx, socket } = useMemo(() => {
    const boxColor = BOX_COLORS[getRandomIndex(BOX_COLORS.length)] ?? BOX_COLORS[0];
    const headerColor = HEADER_COLORS[getRandomIndex(HEADER_COLORS.length)] ?? HEADER_COLORS[0];

    return {
      boxSx: styles.getBoxSx(boxColor),
      headerSx: styles.getHeaderSx(headerColor),
      socket: createSocket()
    };
  }, []);

  const isOpenCodeDisabled = RoomStatus.Inactive === editorStatus;

  const onOpenCode = () => {
    if (isOpenCodeDisabled) {
      return;
    }

    dispatch(setRoom({
      roomId: data.id,
      cursorText: data.first_name,
      mode: EditorMode.SubOwner
    }));
  }

  useEffect(() => {
    const runEffect = async () => {
      const isConnected = await waitConnectSocket(socket);

      if (isConnected) {
        setIsConnected(isConnected)
      } else {
        void runEffect();
      }
    }

    void runEffect()
  }, [socket])

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
          <OpenCodeIcon
            onClick={onOpenCode}
            sx={{
              ...styles.OPEN_CODE_ICON,
              ...(isOpenCodeDisabled ? styles.OPEN_CODE_DISABLED : null)
            }}
          />

          <CloseIcon sx={styles.CLOSE_ICON_SX} onClick={onClose} />
        </Stack>
      </Stack>


      {isConnected && (
        <CodeEditorCollab
          roomId={data.id}
          mode={EditorMode.Watcher}
          withFileManager={false}
          cursorText={cursorName}
          onRoomStatusChanged={setEditorStatus}
          socket={socket}
        />
      )}
    </Box>
  )
}

export default CodeBlock;
