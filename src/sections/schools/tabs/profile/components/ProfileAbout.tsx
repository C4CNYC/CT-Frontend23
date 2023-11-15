import { Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Iconify } from "@components";
import { useGetMySchoolsQuery } from "src/redux/services/manager/schools-manager";
import { useTranslate } from "src/utils/translateHelper";

import { SchoolProfile } from "../../../../../redux/services/interfaces/school.interface";

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface Props {
  data: SchoolProfile;
}

export default function ProfileAbout({
  data,
}: Props): React.ReactElement | null {
  useGetMySchoolsQuery({});

  const translate = useTranslate();

  return (
    <Card>
      <CardHeader title={translate("about")} />
      <Stack spacing={2} sx={{ p: 3 }}>
        {data?.about ? (
          <Typography variant="body2">{data?.about}</Typography>
        ) : (
          ""
        )}
        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />
          <Typography variant="body2">
            {translate("general_profile_live_at")} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {data?.country ?? "N/A"}, {data?.city ?? "N/A"}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{data?.address ?? "N/A"}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:baseline-local-phone" />

          <Typography variant="body2">
            {translate("phone")} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {data?.phone}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
