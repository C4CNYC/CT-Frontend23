import Iconify from "@components/iconify";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TimerPopup from "@sections/teacher-panel/timer-popup/TimerPopup";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

export const QuickRabbitsItem = (): React.ReactElement => {
  const [value, setValue] = useState<string>("");

  const myTheme = createTheme({
    dark: "dark",
    settings: {
      background: "#364954",
      foreground: "#EAEAEB",
      caret: "#EAEAEB",
      selection: "",
      selectionMatch: "#364954",
      gutterBackground: "#364954",
      gutterForeground: "#364954",
      gutterBorder: "#364954",
      gutterActiveForeground: "",
      lineHighlight: "#364954",
    },
  });

  return (
    <Box
      height="369px"
      border="1px solid #cbcccb"
      borderRadius="15px"
      overflow="hidden"
      bgcolor="rgba(121, 56, 56, 0.8)"
    >
      <Box
        bgcolor="rgba(121, 56, 56, 0.8)"
        height="35px"
        p="5px 6px 4px 6px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton sx={{ color: "rgba(240, 238, 238, 0.5)" }}>
          <Iconify icon="ph:dots-six-vertical-bold" width={24} />
        </IconButton>
        <Typography color="#EAEAEB">Header</Typography>
        <Box>
          <IconButton sx={{ color: "#EAEAEB" }}>
            <Iconify icon="material-symbols:chat" />
          </IconButton>
          <IconButton sx={{ color: "#EAEAEB" }}>
            <TimerPopup />
          </IconButton>
          <IconButton sx={{ color: "#EAEAEB" }}>
            <Iconify icon="material-symbols:close-rounded" width={24} />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <CodeMirror
          value={value}
          theme={myTheme}
          height="calc(100vh - 48px)"
          placeholder="<CSS for boxes appear...>"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          extensions={[loadLanguage("html")]}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </Box>
    </Box>
  );
};
