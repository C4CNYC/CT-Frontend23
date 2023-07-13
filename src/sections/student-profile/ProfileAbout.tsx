import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Iconify } from "@components";
import { fDateTime } from "@utils";
import { IUser } from "src/redux/interfaces/auth.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface Props {
  data: IUser | IStudent;
}

export default function ProfileAbout({ data }: Props): React.ReactElement {
  const { school, phone, createdAt, country, post_code: postCode } = data;
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">Live at country {country}</Typography>
        </Stack>
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">Postcode {postCode}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="tabler:phone-filled" />

          <Typography variant="body2">{phone}</Typography>
        </Stack>
        <Stack direction="row">
          <StyledIcon icon="mingcute:school-fill" />

          <Typography variant="body2">{school?.name}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-more-time" />

          <Typography variant="body2">
            Created at {fDateTime(createdAt ?? "")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
