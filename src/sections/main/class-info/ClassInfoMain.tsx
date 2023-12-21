import { FaSchool } from "react-icons/fa";

import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import { IClass } from "src/redux/interfaces/class.interface";

import {
  CLASS_AVATAR_SX,
  CLASS_INFO_WRAPPER,
  TEACHER_EMOJI_SX,
} from "./constants";

interface Props {
  classData: IClass;
}

export default function ClassInfoMain({
  classData,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack direction={isMobile ? "column" : "row"} alignItems="center" gap={2}>
      <Avatar
        sx={CLASS_AVATAR_SX}
        src={classData.avatar ?? ""}
        alt={classData.name}
      />
      <Stack alignItems={isMobile ? "center" : "start"}>
        <Typography variant="h2" sx={{ color: "#fff" }}>
          {classData?.name}
        </Typography>
        <Stack direction="row" sx={CLASS_INFO_WRAPPER}>
          <Typography variant="subtitle2" sx={{ color: "#fff" }}>
            <FaSchool
              color="#fff"
              size="16px"
              style={{ marginRight: "10px" }}
            />
            {classData?.school?.name}
          </Typography>
          <Avatar sx={TEACHER_EMOJI_SX} src={""} alt="">
            &#128540;
          </Avatar>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#fff",
            }}
          >
            Teacher: Admin
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
