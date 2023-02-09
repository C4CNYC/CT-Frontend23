import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
import Iconify from '../../../../../components/iconify';
import {SchoolProfile} from "../../../../../redux/services/interfaces/school.interface";


const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

type Props = {
  data: SchoolProfile;
};

export default function ProfileAbout({data}: Props) {

  return (
    <Card>
      <CardHeader title="About" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{data?.about}</Typography>
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {data?.country}, {data?.city}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{data?.email}</Typography>
        </Stack>
        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            role at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              company
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:baseline-local-phone" />

          <Typography variant="body2">
            Phone &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {data?.phone || "No phone"}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              school
            </Link>
          </Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
