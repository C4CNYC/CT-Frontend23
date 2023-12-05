import { format } from "date-fns";

import { Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface IAbourTribeProps {
  description: string;
  country: string;
  city: string;
  createdAt: string;
  schoolName: string;
}
export default function AboutTribe({
  description,
  country,
  city,
  createdAt,
  schoolName,
}: IAbourTribeProps) {
  const translate = useTranslate();

  return (
    <Card>
      <CardHeader title={translate("about")} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{description}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            {translate("general_profile_live_at")} &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}, {city}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            {translate("profile_created_at")}: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {format(new Date(createdAt), "dd.mm.yyyy")}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="fa-solid:school" />

          <Typography variant="body2">
            {translate("school")}: &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {schoolName}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
