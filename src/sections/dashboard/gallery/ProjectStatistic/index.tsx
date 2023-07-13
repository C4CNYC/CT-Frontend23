import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail, BiGitBranch } from "react-icons/bi";
import { MdOutlineVisibility } from "react-icons/md";

import { Box, Stack, Typography } from "@mui/material";

export default function ProjectStatistic(): React.ReactElement {
  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          alignSelf: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "#364954" }}>
          <MdOutlineVisibility size="20px" />
          <Typography sx={{ ml: 0.5 }} variant="body2">
            2k
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", color: "#364954" }}>
          <AiOutlineHeart size="20px" />
          <Typography sx={{ ml: 0.5 }} variant="body2">
            214
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", color: "#364954" }}>
          <BiCommentDetail size="20px" />
          <Typography sx={{ ml: 0.5 }} variant="body2">
            16
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", color: "#364954" }}>
          <BiGitBranch size="20px" />
          <Typography sx={{ ml: 0.5 }} variant="body2">
            5
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
