import { Card, Stack, Typography, Divider } from "@mui/material";
import { fNumber } from "../../../../../utils/formatNumber";

type Props = {
  student_count?: number | null;
  teacher_count?: number | null;
};

export default function ProfileUsersInfo({
  student_count = 0,
  teacher_count = 0,
}: Props) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(student_count)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Students
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(teacher_count)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Teachers
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
