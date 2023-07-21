import { AiFillInfoCircle } from "react-icons/ai";

import { Card, Stack, Typography } from "@mui/material";

export default function RecentLessons(): React.ReactElement {
  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          padding: "24px 26px 24px 24px",
          width: "344px",
        }}
      >
        <Stack display="flex" direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight="600" fontSize="18px">
            Recent Lessons Edited
          </Typography>
          <AiFillInfoCircle size={30} fill="rgba(145, 158, 171, 0.16)" />
        </Stack>
        {/* <Stack display="flex" direction="row" gap="16px" mt="24px">
          <Avatar sizes="40"></Avatar>
          <Stack>
            <Typography
              variant="subtitle2"
              fontWeight="600"
              fontSize="14px"
              color="#212B36"
            >
              Husna Navarro
            </Typography>
            <Typography
              variant="body2"
              fontWeight="400"
              fontSize="14px"
              color="#637381"
            >
              Last signed up at 10.00AM
            </Typography>
          </Stack>
        </Stack> */}
      </Card>
    </>
  );
}
