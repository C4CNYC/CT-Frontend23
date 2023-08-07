import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import ShareGroupModal from "src/components/share-group-modal";

export default function QuestHeader(): React.ReactElement {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <IconButton edge="start">
        <MdOutlineArrowBackIosNew size={30} />
      </IconButton>
      <Stack sx={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <ShareGroupModal schoolClass={undefined}>
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
        </ShareGroupModal>
        <Typography variant="button">Type: Course/Module </Typography>
      </Stack>
    </Stack>
  );
}
