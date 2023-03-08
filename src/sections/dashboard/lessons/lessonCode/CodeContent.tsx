import { Box, CircularProgress, Stack } from "@mui/material";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import * as React from "react";

type Props = {
  code?: string;
  setUserCode: Function;
  isLoading: boolean;
};

export default function CodeContent({
  code,
  setUserCode,
  isLoading,
}: Props): React.ReactElement {
  return (
    <Box>
      {isLoading ? (
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="450px"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <CodeMirror
          value={code}
          theme={dracula}
          height="80vh"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          extensions={[loadLanguage("html")]}
          onChange={(value) => {
            setUserCode(value);
          }}
        />
      )}
    </Box>
  );
}
