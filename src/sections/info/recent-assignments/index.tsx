import { AiFillInfoCircle } from "react-icons/ai";

import CircleIcon from "@mui/icons-material/Circle";
import { Avatar, Card, Stack, Typography } from "@mui/material";

export default function RecentAssignments(): React.ReactElement {
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
          <Typography variant="h6" fontWeight="600" fontSize="18px" mr="8px">
            Recent Assignments
          </Typography>
          <Typography
            variant="body1"
            fontWeight="400"
            fontSize="16px"
            color="#637381"
            sx={{ mr: { xs: "20px", sm: "50px" } }}
          >
            (40)
          </Typography>
          <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
        </Stack>
        <Stack display="flex" direction="row" alignItems="center" mt="24px">
          <Avatar />
          <Stack ml="16px" mr="87px" sx={{ mr: { xs: 7, sm: "87px" } }}>
            <Typography variant="subtitle2" fontWeight="600" fontSize="14px">
              Husna Navarro
            </Typography>
            <Typography variant="body2" fontWeight="400" fontSize="14px">
              avery43@hotmail.com
            </Typography>
          </Stack>
          <CircleIcon sx={{ fontSize: "8px", color: "#54D62C" }} />
        </Stack>
      </Card>
    </>
  );
}
