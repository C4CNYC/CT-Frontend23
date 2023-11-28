import { countries } from "@assets/data";

import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Iconify } from "@components";
import { fDateTime } from "@utils";
import { IUser } from "src/redux/interfaces/auth.interface";

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface IProfileAboutProps {
  data?: IUser;
}

export default function ProfileAbout({
  data,
}: IProfileAboutProps): React.ReactElement {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Live at country &nbsp;
            {countries.find((el) => data?.student_profile.country === el.code.toLowerCase())
              ?.label ?? "-"}
          </Typography>
        </Stack>
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Postcode &nbsp;{data?.student_profile.post_code ?? "-"}
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="tabler:phone-filled" />

          <Typography variant="body2">&nbsp;{data?.student_profile.phone ?? "-"}</Typography>
        </Stack>
        <Stack direction="row">
          <StyledIcon icon="mingcute:school-fill" />

          <Typography variant="body2">&nbsp;{data?.student_profile.about ?? "-"}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-more-time" />

          <Typography variant="body2">
            Created at &nbsp;{fDateTime(data?.createdAt ?? "")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
