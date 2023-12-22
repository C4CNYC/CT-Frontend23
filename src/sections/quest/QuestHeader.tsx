import { useRouter } from "next/router";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

export default function QuestHeader(): React.ReactElement {
  const { back } = useRouter();
  const translate = useTranslate();

  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <IconButton edge="start" onClick={back}>
        <MdOutlineArrowBackIosNew size={30} />
      </IconButton>
      <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <Button
          variant="text"
          disableRipple
          sx={{
            color: "inherit",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              background: "none",
            },
          }}
        >
          <TbShare2 size="18px" />
          <Typography variant="button" sx={{ ml: 0.5 }}>
            {translate("actions_share")}
          </Typography>
        </Button>
        <Typography variant="button">{translate("quest_type")}</Typography>
      </Stack>
    </Stack>
  );
}
