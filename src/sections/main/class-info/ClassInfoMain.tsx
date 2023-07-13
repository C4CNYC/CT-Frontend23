import { FaSchool } from "react-icons/fa";

import { Avatar, Stack, Typography } from "@mui/material";

export default function ClassInfoMain(): React.ReactElement {
  return (
    <Stack direction="row" gap={2}>
      <Avatar
        sx={{
          width: 60,
          height: 60,
          border: "2px solid #ED9526",
          background: "#FBDD3F",
          fontSize: "40px",
          mt: { xs: 1, sm: 0 },
        }}
        src={""}
        alt=""
      >
        🦄
      </Avatar>
      <Stack>
        <Typography variant="h4" sx={{ color: "#fff" }}>
          BarkRiders - Class5A 🐆
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
            School
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
            Teacher:
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
