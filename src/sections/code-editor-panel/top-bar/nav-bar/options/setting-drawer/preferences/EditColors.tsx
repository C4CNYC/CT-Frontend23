import { useEffect, useState } from "react";

import { MuiColorInput, matchIsValidColor } from "mui-color-input";

import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

import BasePreference from "./BasePreference";

const DEFAULT_BACKGROUDN = "#FFF";
const DEFAULT_TEXT_COLOR = "#000";

interface IEditColors {
  onUpdateColors: (data: { background: string; text: string }) => void;
}

const EditColors = ({ onUpdateColors }: IEditColors): React.ReactElement => {
  const [colors, setColors] = useState<{ background: string; text: string }>({
    background: DEFAULT_BACKGROUDN,
    text: DEFAULT_TEXT_COLOR,
  });
  const translate = useTranslate();

  useEffect(() => {
    onUpdateColors(colors);
  }, [colors]);

  return (
    <BasePreference
      title={translate("editor_colors")}
      abandonmentIcon={
        <IconButton
          onClick={() => {
            setColors({
              background: DEFAULT_BACKGROUDN,
              text: DEFAULT_TEXT_COLOR,
            });
          }}
        >
          <Iconify width="25px" icon="ci:arrow-reload-02" />
        </IconButton>
      }
    >
      <Box display="grid" gap="15px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{translate("bg_color")}</Typography>
          <MuiColorInput
            sx={{
              "& .MuiInputBase-input": {
                opacity: 0,
                width: 0,
                padding: "8.5px 3px",
              },
            }}
            format="hex"
            value={
              matchIsValidColor(colors.background) ? colors.background : ""
            }
            onChange={(data) => {
              setColors((prev) => ({ ...prev, background: data }));
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">{translate("text_color")}</Typography>
          <MuiColorInput
            sx={{
              "& .MuiInputBase-input": {
                opacity: 0,
                width: 0,
                padding: "8.5px 3px",
              },
            }}
            format="hex"
            value={matchIsValidColor(colors.text) ? colors.text : ""}
            onChange={(data) => {
              setColors((prev) => ({ ...prev, text: data }));
            }}
          />
        </Box>
      </Box>
    </BasePreference>
  );
};

export default EditColors;
