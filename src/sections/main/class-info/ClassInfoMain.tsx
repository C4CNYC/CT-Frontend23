import { FaSchool } from "react-icons/fa";

import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";

import { useTheme } from "@mui/system";

import { IClass } from "src/redux/interfaces/class.interface";

interface Props {
  classData: IClass;
}

export default function ClassInfoMain({
  classData,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      alignItems="center"
      gap={2}
      >
      <Avatar
        sx={{
          width: 60,
          height: 60,
          border: "2px solid #ED9526",
          background: "#FBDD3F",
          fontSize: "40px",
        }}
        src={classData.avatar ?? ""}
        alt={classData.name}
      />
      <Stack alignItems={ isMobile ? "center" : "start"}>
        <Typography variant="h2" sx={{ color: "#fff" }}>
          {classData?.name}
        </Typography>
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#fff" }}>
            <FaSchool
              color="#fff"
              size="16px"
              style={{ marginRight: "10px" }}
            />
            {classData?.school?.name}
          </Typography>
          <Avatar
            sx={{
              width: "25px",
              height: "25px",
              mr: -1,
            }}
            src={""}
            alt=""
          >
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
