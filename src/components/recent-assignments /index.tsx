import { Card, Typography, Stack, Avatar } from "@mui/material";
import { AiFillInfoCircle } from "react-icons/ai";
import CircleIcon from "@mui/icons-material/Circle";

export default function RecentAssignments() {
  return (
    <>
      <Card
        sx={{
          padding: "24px 26px 24px 24px",
          maxWidth: "100%",
          width: "344px",
        }}
      >
        <Stack display="flex" direction="row" alignItems="center">
          <Typography variant="h6" fontWeight="600" fontSize="18px">
            Recent Assignments
          </Typography>
          <Typography
            variant="body1"
            fontWeight="400"
            fontSize="16px"
            color="#637381"
            mr="58px"
          >
            (40)
          </Typography>
          <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
        </Stack>
        <Stack>
          <Avatar />
          <Typography variant="subtitle2">Husna Navarro</Typography>
          <Typography>avery43@hotmail.com</Typography>
          <CircleIcon sx={{ fontSize: "8px", color: "#54D62C" }} />
        </Stack>
      </Card>
    </>
  );
}
