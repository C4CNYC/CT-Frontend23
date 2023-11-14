import { Card, Divider, Stack, Typography } from "@mui/material";

import { fNumber } from "@utils";
import { useLocales } from "src/locales";

interface Props {
  studentCount?: number | null;
  teacherCount?: number | null;
}

export default function ProfileUsersInfo({
  studentCount = 0,
  teacherCount = 0,
}: Props): React.ReactElement | null {
  const { translate } = useLocales();

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(studentCount)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("students") as string}
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(teacherCount)}</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("teachers") as string}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
