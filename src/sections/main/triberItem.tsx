import { Avatar, Box, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { IClass } from "src/redux/interfaces/class.interface";
import { BaseResponseInterface } from "@utils";

interface Props {
  tribe?: IClass & BaseResponseInterface;
}
export default function TriberItem({
  tribe,
}: Props): React.ReactElement | null {
  if (!tribe) return null;
  return (
    <Stack direction="row" alignItems="center">
      <Avatar>{_.upperCase(tribe.name[0])}</Avatar>
      <Box sx={{ margin: "0 54px 0 16px" }}>
        <Typography variant="subtitle2">{tribe.name}</Typography>
      </Box>
    </Stack>
  );
}
