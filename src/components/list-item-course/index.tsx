import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";
import { ILesson } from "src/redux/interfaces/content.interface";

export enum LessonStatus {
  DONE = "done",
  READY = "ready",
  LOCK = "lock",
}

interface Prop {
  lessons: ILesson;
  onClick: () => void;
  status: LessonStatus;
}

const statusIcons = {
  [LessonStatus.DONE]: "material-symbols:check-circle-outline",
  [LessonStatus.LOCK]: "material-symbols:lock-outline",
  [LessonStatus.READY]: "material-symbols:play-circle-outline",
};

export default function ListItemCourse({
  lessons,
  status,
  onClick,
}: Prop): React.ReactElement {
  return (
    <ListItem
      sx={{
        width: "500px",
        bgcolor: "background.paper",
      }}
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          backgroundColor: "#f6f7f9",
          "&:hover": {
            bgcolor: "#dee2e7",
          },
        }}
      >
        <ListItemIcon>
          <Iconify
            icon={statusIcons[status]}
            width="34px"
            padding="3px"
            border="1px solid #e5e8eb"
            borderRadius={2}
            sx={{ backgroundColor: "#e5e8eb" }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography color="#5a626b" variant="subtitle1">
            {lessons.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
