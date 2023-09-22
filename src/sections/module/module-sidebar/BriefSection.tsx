import { useState } from "react";

import { AiOutlineClockCircle } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuSchool } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";

import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
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
  const [openBrief, setOpenBrief] = useState(false);

  return (
    <Paper
      elevation={5}
      sx={{ borderRadius: 3, bgcolor: "#F8F8F8", py: 1, px: 2, mt: 2 }}
    >
      <Button
        onClick={() => {
          setOpenBrief(!openBrief);
        }}
        disableRipple
        sx={{
          justifyContent: "space-between",
          width: "100%",
          color: "inherit",
          gap: 2,
          "&:hover": {
            background: "none",
          },
        }}
      >
        <Typography variant="h6" fontWeight={400} whiteSpace="nowrap">
          THE BRIEF
        </Typography>
        {openBrief ? <FaChevronUp size={22} /> : <FaChevronDown size={22} />}
      </Button>
      <Collapse in={openBrief}>
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
        <Typography variant="body2">
          For curious beginners who want to understand the basics of web dev and
          who.
        </Typography>
        <Typography variant="body2">
          A fantastic entry-point for understanding....
        </Typography>
      </Collapse>
    </Paper>
  );
}
