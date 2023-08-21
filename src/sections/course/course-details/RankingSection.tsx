import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { TbFileCertificate } from "react-icons/tb";

import { Paper, Stack, Typography } from "@mui/material";

export default function RankingSection(): React.ReactElement {
  return (
    <Paper
      elevation={5}
      sx={{ borderRadius: 3, bgcolor: "#F8F8F8", p: 2, mb: 2 }}
    >
      <Typography variant="h6" fontWeight={400}>
        RANKING
      </Typography>
      <Stack direction="row" gap={1.5} pt={1}>
        <Stack direction="row" gap={1}>
          <AiOutlineHeart size={25} color="#EE467A" />
          <Typography variant="body1">12k</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <AiOutlineStar size={25} color="#FBDD3F" />
          <Typography variant="body1">4.3k</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <TbFileCertificate size={25} color="#43D4DD" />
          <Typography variant="body1">2.7k</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
