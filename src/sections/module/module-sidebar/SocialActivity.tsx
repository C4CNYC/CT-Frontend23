import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { TbFileCertificate } from "react-icons/tb";

import { Stack } from "@mui/material";

import { convertNumber } from "@utils";

interface ISocialActivityProps {
  likes: number;
  rated: number;
  certificate: number;
}

export default function SocialActivity({
  likes,
  rated,
  certificate,
}: ISocialActivityProps): React.ReactElement {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        borderBottomLeftRadius: "24px",
        borderTopRightRadius: "24px",
        alignSelf: "flex-end",
        py: 2,
        px: { xs: 3, lg: 4 },
        gap: { xs: 2, md: 3, lg: 6 },
      }}
    >
      <Stack direction="row" gap={1}>
        <TbFileCertificate color="rgba(67, 212, 221, 1)" size={22} />
        {convertNumber(certificate)}
      </Stack>
      <Stack direction="row" gap={1}>
        <AiOutlineHeart color="rgba(238, 70, 122, 1)" size={22} />
        {convertNumber(likes)}
      </Stack>
      <Stack direction="row" gap={1}>
        <AiOutlineStar color="rgba(251, 221, 63, 1)" size={22} />
        {convertNumber(rated)}
      </Stack>
    </Stack>
  );
}
