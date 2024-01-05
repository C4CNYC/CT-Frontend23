import { useState } from "react";

import { useSnackbar } from "notistack";
import { HiArrowUpTray } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material";

import { useCopyToClipboard } from "@hooks";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface, localStorageAvailable } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";

import {
  LINK_TEXT_SX,
  NOTIFICATION_CONTAINER_SX,
  NOTIFICATION_LINK_SX,
  NOTIFICATION_WRAPPER_SX,
} from "./constants";

const localStorageKey = "IS_OPEN_NOTIFICATION";

interface IOnceOffNotificationProps {
  classData: IClass & BaseResponseInterface;
}

export default function OnceOffNotification({
  classData,
}: IOnceOffNotificationProps): React.ReactElement {
  const storageAvailable = localStorageAvailable();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const getNotificationState = () => {
    if (storageAvailable) {
      const isOpen = JSON.parse(
        window.localStorage.getItem(localStorageKey) ?? "true"
      );
      return isOpen;
    }
    return true;
  };

  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(() =>
    getNotificationState()
  );

  const closeNotification = (): void => {
    setIsOpenNotification(false);
    window.localStorage.setItem(localStorageKey, JSON.stringify(false));
  };

  const onCopy = (textToCopy: string) => {
    if (textToCopy) {
      copy(textToCopy);
      enqueueSnackbar("Copied!");
    }
  };

  const shareLink = `${
    window.location.origin
  }${STUDENT_PATH_DASHBOARD.joinTribe.id(classData?.setting.share_token)}`;

  return (
    <Collapse in={isOpenNotification}>
      <Stack direction="row" sx={NOTIFICATION_WRAPPER_SX}>
        <Stack direction="row" sx={NOTIFICATION_CONTAINER_SX}>
          <Typography variant="subtitle2" sx={{ mx: 1 }}>
            Add students to your group by sharing the
          </Typography>
          <Box
            sx={NOTIFICATION_LINK_SX}
            onClick={() => {
              onCopy(shareLink);
            }}
          >
            <HiArrowUpTray size="18px" color="#364954" />
            <Typography variant="body2" sx={LINK_TEXT_SX}>
              invite link
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={() => {
            closeNotification();
          }}
          sx={{ p: 0.5 }}
          edge="end"
        >
          <IoClose size="20px" color="#364954" />
        </IconButton>
      </Stack>
    </Collapse>
  );
}
