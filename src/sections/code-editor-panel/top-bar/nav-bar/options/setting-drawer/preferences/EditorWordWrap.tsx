import { useState } from "react";

import { Stack, Switch, Typography } from "@mui/material";

import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

import BasePreference from "./BasePreference";

interface IEditorWordWrap {
  onUpdateWordWrap: (newValue: boolean) => void;
}

const EditorWordWrap = ({
  onUpdateWordWrap,
}: IEditorWordWrap): React.ReactElement => {
  const [wordWrap, setWordWrap] = useState(true);
  const translate = useTranslate();
  return (
    <BasePreference
      title={translate("word_wrap")}
      abandonmentIcon={
        <Iconify width="27px" icon="material-symbols:wrap-text-rounded" />
      }
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">{translate("enable")}</Typography>
        <Switch
          checked={wordWrap}
          onChange={(e, newvalue) => {
            setWordWrap(!wordWrap);
            onUpdateWordWrap(newvalue);
          }}
        />
      </Stack>
    </BasePreference>
  );
};

export default EditorWordWrap;
