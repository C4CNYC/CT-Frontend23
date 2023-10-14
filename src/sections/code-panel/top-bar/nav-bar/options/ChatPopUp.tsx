import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useAtom } from "jotai";
import Draggable from "react-draggable";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";

import { Iconify } from "@components";

import { chatHandlerAtom } from "./chatHendlerAtom";

interface IChatPopup {
  chatComponent: React.ReactElement;
}

const ChatPopup = ({ chatComponent }: IChatPopup): React.ReactElement => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [isChatVisible, setChatVisible] = useAtom(chatHandlerAtom);
  return (
    <>
      <IconButton
        sx={{
          display: isDesktop ? "inline-flex" : "none",
          background: isChatVisible ? "#c5d6e3" : "#fff",
          "&:hover": { background: isChatVisible ? "#c5d6e3" : "" },
        }}
        onClick={() => {
          setChatVisible(!isChatVisible);
        }}
      >
        <Iconify icon="ph:chat" />
      </IconButton>

      {isChatVisible ? (
        isDesktop ? (
          <Draggable>
            <div
              style={{
                position: "absolute",
                height: "500px",
                width: "350px",
                right: 20,
                bottom: 20,
                zIndex: 5000,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={() => {
                  setChatVisible(false);
                }}
                sx={{ alignSelf: "flex-end", p: "2px", mb: "2px" }}
              >
                <CloseIcon />
              </IconButton>
              {chatComponent}
            </div>
          </Draggable>
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: "100vh",
              width: "100vw",
              zIndex: 5000,
              background: "#fff",
            }}
          >
            {/* <IconButton
              onClick={() => {
                setChatVisible(false);
              }}
              sx={{ position: "absolute", top: 12, right: 4, zIndex: 5001 }}
            >
              <CloseIcon />
            </IconButton> */}
            {chatComponent}
          </Box>
        )
      ) : null}
    </>
  );
};

export default ChatPopup;
