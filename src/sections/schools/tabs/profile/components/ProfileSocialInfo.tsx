import { Card, CardHeader, Link, Stack } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

import { SOCIAL_ICONS } from "../../../../../assets/data";

interface Props {
  socialLinks?: [];
  SOCIAL_ICONS?: [];
}

export default function ProfileSocialInfo({
  socialLinks,
}: Props): React.ReactElement | null {
  const translate = useTranslate();

  return (
    <Card>
      <CardHeader title={translate("social")} />
      <Stack spacing={2} sx={{ p: 3 }}>
        {socialLinks?.map((item: any) => (
          <Stack direction="row" sx={{ wordBreak: "break-all" }} key={item.id}>
            <Link
              component="a"
              href={item.link}
              target="_blank"
              variant="body2"
              color="text.primary"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {SOCIAL_ICONS[item.type]}
              <Stack sx={{ ml: 1 }}>{item.link}</Stack>
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
