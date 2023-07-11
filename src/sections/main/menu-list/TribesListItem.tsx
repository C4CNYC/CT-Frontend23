import { Avatar, Box, Stack, Typography } from "@mui/material";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";
interface Props {
  active: boolean;
  tribe: IClass & BaseResponseInterface
}

export default function TribeListItem({ active, tribe }: Props): React.ReactElement {
  return (
    <Stack direction="row" sx={{ alignItems: "center", position: "relative" }}>
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "5px",
          left: "-12px",
          height: "20px",
          width: "4px",
          background: theme.palette.info.light,
          borderRadius: 2,
          zIndex: 10,
          display: active ? "block" : "none",
        })}
      />
      <Avatar
        variant="rounded"
        src={tribe.avatar}
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          width: "30px",
          height: "30px",
        })}
      />
      <Typography
        sx={(theme) => ({ ml: 2, color: theme.palette.text.secondary })}
        variant="body1"
      >
        {tribe.name}
      </Typography>
    </Stack>
  );
}
