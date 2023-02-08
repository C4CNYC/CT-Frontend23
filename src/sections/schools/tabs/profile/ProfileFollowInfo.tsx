import { Card, Stack, Typography, Divider } from '@mui/material';
import { fNumber } from '../../../../utils/formatNumber';

type Props = {
  students?: number | null;
  teachers?: number | null;
};


export default function ProfileFollowInfo({ students = 0, teachers = 0 }: Props) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(students)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Students
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(teachers)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Teachers
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
