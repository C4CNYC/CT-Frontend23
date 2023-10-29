import { AiOutlineClockCircle } from "react-icons/ai";
import { LuSchool } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

interface IBriefSectionProps {
  duration: string;
  level: string;
  lessons: string;
  grade: string;
}

export default function BriefSection({
  duration,
  level,
  lessons,
  grade,
}: IBriefSectionProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor:
          theme.palette.mode === "light"
            ? "#F8F8F8"
            : theme.palette.background.paper,
        pb: 2,
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <AiOutlineClockCircle size={20} />
          </ListItemIcon>
          <ListItemText primary={duration} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SiLevelsdotfyi size={20} />
          </ListItemIcon>
          <ListItemText primary={level} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MdOutlinePlayLesson size={20} />
          </ListItemIcon>
          <ListItemText primary={lessons} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LuSchool size={20} />
          </ListItemIcon>
          <ListItemText primary={grade} />
        </ListItem>
      </List>
      <Box sx={{ px: 2 }}>
        <Typography variant="body2">
          For curious beginners who want to understand the basics of web dev and
          who.
        </Typography>
        <Typography variant="body2">
          A fantastic entry-point for understanding....
        </Typography>
      </Box>
    </Box>
  );
}
