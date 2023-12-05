import { format } from "date-fns";
import { FaGraduationCap } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";

import { Box, Typography } from "@mui/material";

import { IStudent } from "src/redux/services/interfaces/user.interface";
import { useTranslate } from "src/utils/translateHelper";

interface ITribeStatisticsProps {
  students: IStudent[];
  createdAt: string;
}

export default function TribeStatistics({
  students,
  createdAt,
}: ITribeStatisticsProps): React.ReactElement {
  const translate = useTranslate();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
        mt: 1,
      }}
    >
      <Box sx={{ display: "flex", color: "#919EAB" }}>
        <Box mr={1}>
          <HiUsers size="20px" color="#919EAB" />
        </Box>

        <Typography variant="body2">
          {students?.length}{" "}
          {students?.length === 1 ? translate("user") : translate("users")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", color: "#919EAB" }}>
        <Box mr={1}>
          <FaGraduationCap size="20px" color="#919EAB" />
        </Box>
        <Typography variant="body2">N/A</Typography>
      </Box>
      <Box sx={{ display: "flex", color: "#919EAB" }}>
        <Box mr={1}>
          <IoCalendar size="20px" color="#919EAB" />
        </Box>
        <Typography variant="body2">
          {format(new Date(createdAt), "MMM dd yyyy")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", color: "#919EAB" }}>
        <Box mr={1}>
          <TiLocation size="20px" color="#919EAB" />
        </Box>
        <Typography variant="body2">{translate("online")}</Typography>
      </Box>
    </Box>
  );
}
