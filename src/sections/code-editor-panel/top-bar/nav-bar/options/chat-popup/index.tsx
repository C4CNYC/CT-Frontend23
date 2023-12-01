import { type CSSProperties, type FC, type ReactNode } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

import { Iconify } from "@components";
import { setChatVisible } from "src/redux/slices/chat-handler";
import { useSelector } from "src/redux/store";

interface IChatPopup {
  chatComponent: ReactNode;
}

const ChatPopup: FC<IChatPopup> = ({ chatComponent }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const dispatch = useDispatch();
  const isChatVisible = useSelector((state) => state.chatHandler.isChatVisible);

  const getContent = () => {
    if (!isChatVisible) {
      return;
    }

    if (isDesktop) {
      return (
        <Draggable>
          <div style={DRAGGABLE_STYLES}>
            <IconButton
              onClick={() => {
                dispatch(setChatVisible(false));
              }}
              sx={ICON_BUTTON_STYLES}
            >
              <CloseIcon />
            </IconButton>

            {chatComponent}
          </div>
        </Draggable>
      );
    }

    return <Box sx={() => ({ ...getBoxStyles(theme) })}>{chatComponent}</Box>;
  };

  return (
    <>
      <IconButton
        sx={{
          display: isDesktop ? "inline-flex" : "none",
          background: isChatVisible
            ? "#c5d6e3"
            : theme.palette.background.default,
          "&:hover": { background: isChatVisible ? "#c5d6e3" : "" },
        }}
        onClick={() => {
          dispatch(setChatVisible(!isChatVisible));
        }}
      >
        <Iconify icon="ph:chat" />
      </IconButton>

      {getContent()}
    </>
  );
};

const getBoxStyles = (theme: Theme): SxProps => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 5000,
  background: theme.palette.background.default,
});

const ICON_BUTTON_STYLES = {
  alignSelf: "flex-end",
  p: "2px",
  mb: "2px",
};

const DRAGGABLE_STYLES: CSSProperties = {
  position: "absolute",
  height: "500px",
  width: "350px",
  right: 20,
  bottom: 20,
  zIndex: 5000,
  display: "flex",
  flexDirection: "column",
};

export default ChatPopup;
