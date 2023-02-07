import { Card, Stack, Typography, Divider } from '@mui/material';
import { fNumber } from '../../../../utils/formatNumber';

type Props = {
  followers: number | null;
  following: number | null;
};


export default function ProfileFollowInfo({ follower = 1000, following = 21000 }: Props) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Follower
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Following
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
