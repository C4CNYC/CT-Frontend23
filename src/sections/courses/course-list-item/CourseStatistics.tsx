import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { TbFileCertificate } from "react-icons/tb";

import { Box, Typography } from "@mui/material";

interface ICourseStatistics {
  likesCount: number;
}

export default function CourseStatistics({
  likesCount,
}: ICourseStatistics): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <TbFileCertificate size="30px" color="#43D4DD" />
        <Typography
          variant="body1"
          sx={{
            ml: "10px",
          }}
        >
          2.7k
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AiOutlineHeart size="30px" color="#EE467A" />
        <Typography
          variant="body1"
          sx={{
            ml: "10px",
          }}
        >
          {likesCount}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AiFillStar size="30px" color="#FBDD3F" />
        <Typography
          variant="body1"
          sx={{
            ml: "10px",
          }}
        >
          8.2k
        </Typography>
      </Box>
    </Box>
  );
}
