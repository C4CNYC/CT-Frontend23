import { useEffect, useState } from "react";

import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

import BasePreference from "./BasePreference";

const MIN_FONT_SIZE = 7;
const DEFAULT_MIRROR_SIZE = 16;

interface IEditorFontSize {
  onUpdateFontSize: (size: number) => void;
}

const EditorFontSize = ({
  onUpdateFontSize,
}: IEditorFontSize): React.ReactElement => {
  const [fontSize, setFontSize] = useState(DEFAULT_MIRROR_SIZE);
  const translate = useTranslate();

  useEffect(() => {
    onUpdateFontSize(fontSize);
  }, [fontSize]);

  return (
    <BasePreference title={translate("font_size")}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          sx={{ mr: "20px" }}
          onClick={() => {
            if (fontSize === MIN_FONT_SIZE) return;
            setFontSize((prev) => --prev);
          }}
        >
          <Iconify width="20px" icon="ic:baseline-minus" />
        </IconButton>
        <Typography variant="h6">{fontSize}</Typography>
        <IconButton
          sx={{ ml: "20px" }}
          onClick={() => {
            setFontSize((prev) => ++prev);
          }}
        >
          <Iconify width="20px" icon="ic:round-plus" />
        </IconButton>
      </Box>
    </BasePreference>
  );
};

export default EditorFontSize;
