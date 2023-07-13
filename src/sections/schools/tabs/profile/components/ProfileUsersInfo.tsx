import { Card, Divider, Stack, Typography } from "@mui/material";

import { fNumber } from "@utils";

interface Props {
  studentCount?: number | null;
  teacherCount?: number | null;
}

export default function ProfileUsersInfo({
  studentCount = 0,
  teacherCount = 0,
}: Props): React.ReactElement | null {
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(studentCount)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Students
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(teacherCount)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Teachers
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
