import { FaPlus } from "react-icons/fa";

import { 
  Stack,
  Button, 
  Divider, 
 } from "@mui/material";
 
import TribeListItem from "./TribesListItem";

export default function MenuTribesList(): React.ReactElement {
  return (
    <Stack sx={{}}>
      <Divider sx={{ borderBottomWidth: "4px", mb: 2, ml: 2 }} />

      <Stack
        sx={{
          gap: 1,
          maxHeight: "150px",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: 0,
          },
        }}
      >
        <Button
          sx={(theme) => ({
            alignSelf: "flex-start",
            borderRadius: 1,
            minWidth: "30px",
            p: 0,
            ml: 2,
            minHeight: "30px",
            height: "30px",
            color: theme.palette.info.light,
            border: `2px solid ${theme.palette.info.light}`,
          })}
        >
          <FaPlus size={20} />
        </Button>
        <Stack gap={1} ml={2}>
          <TribeListItem active={true} />
          <TribeListItem active={false} />
          <TribeListItem active={false} />
          <TribeListItem active={false} />
        </Stack>
      </Stack>
      <Divider sx={{ borderBottomWidth: "4px", mt: 2, ml: 2 }} />
    </Stack>
  );
}
