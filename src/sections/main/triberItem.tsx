import _ from "lodash";

import { 
  Box, 
  Stack, 
  Avatar, 
  Typography,
 } from "@mui/material";

import { BaseResponseInterface } from "@utils";

import { IClass } from "src/redux/interfaces/class.interface";

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
