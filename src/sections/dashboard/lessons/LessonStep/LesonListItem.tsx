import { Box, IconButton, Paper, Typography } from "@mui/material";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
import { IoMdCopy } from "react-icons/io";
export default function LessonListItem(): React.ReactElement {
  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        p: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 2 }}>
          <IconButton>
            <BsFillMenuButtonFill size="20px" />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h6">Assigments intro</Typography>
          <Typography variant="body2">The goal of this is to .....</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <IconButton>
          <IoMdCopy size="20px" />
        </IconButton>
        <IconButton>
          <CgBrowser size="20px" />
        </IconButton>
      </Box>
    </Paper>
  );
}
