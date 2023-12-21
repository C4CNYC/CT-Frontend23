import NextLink from "next/link";

import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Scrollbar, SvgColor } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { BaseResponseInterface, getLinearGradient } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";
import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";

import TribeButtons from "./TribeButtons";
import TribeHeaderBtn from "./TribeHeaderBtn";
import TribeStatistics from "./TribeStatistics";

interface ITribeItemProps {
  tribe: IClass & BaseResponseInterface;
}

export default function TribeItem({
  tribe,
}: ITribeItemProps): React.ReactElement {
  const { data } = useGetClassStudentsQuery({ id: tribe.id });

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        textDecoration: "none",
      }}
      component={NextLink}
      href={STUDENT_PATH_DASHBOARD.tribes.tribe(tribe.id)}
    >
      <Box
        sx={{
          height: "66px",
          display: "flex",
          justifyContent: "flex-end",
          p: "5px",
          background: getLinearGradient(tribe.cover ?? "#784af4"),
        }}
      >
        <Chip
          label="Tribe"
          sx={{
            height: "20px",
            width: "70px",
            fontWeight: 500,
            background: "linear-gradient(180deg, #4FF3FE 0%, #329096 100%)",
            color: "#fff",
          }}
        />
        <Chip
          label="Admin"
          sx={{
            height: "20px",
            width: "70px",
            fontWeight: 500,
            background: "linear-gradient(180deg, #C2C1C1 0%, #868484 100%)",
            color: "#fff",
            ml: 1,
          }}
        />
      </Box>

      <Box sx={{ position: "relative" }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 160,
            height: 72,
            zIndex: 9,
            bottom: -30,
            position: "absolute",
            color: "background.paper",
          }}
        />

        <Avatar
          alt="name"
          src={tribe.avatar ?? "/assets/tribe/tribe_icon.png"}
          sx={{
            left: 40,
            zIndex: 9,
            width: 80,
            height: 80,
            bottom: -44,
            position: "absolute",
          }}
        />
      </Box>
      <Stack sx={{ px: 3, gap: 2, pb: 2 }}>
        <TribeHeaderBtn />
        <Typography variant="h5" mb="-5px">
          {tribe.name}
        </Typography>
        <Scrollbar sx={{ height: "63px" }}>
          <Typography variant="body1">
            {tribe.description ??
              "There will be information about this tribe when the teacher add it"}
          </Typography>
        </Scrollbar>
        <AvatarGroup max={4} total={tribe.students?.length}>
          {data?.data.map((student) => (
            <Tooltip key={student.id} title={student.email}>
              <Avatar alt="student.email" src={student.avatar} />
            </Tooltip>
          ))}
        </AvatarGroup>
        <TribeStatistics
          students={data?.data ?? []}
          createdAt={tribe.createdAt}
        />
      </Stack>

      <Divider flexItem />
      <TribeButtons />
    </Paper>
  );
}
