import { useRouter } from "next/router";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

import { Button, IconButton, Stack, Typography } from "@mui/material";

export default function QuestHeader(): React.ReactElement {
  const { back } = useRouter();
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
            Share
          </Typography>
        </Button>
        <Typography variant="button">Type: Course/Module </Typography>
      </Stack>
    </Stack>
  );
}
