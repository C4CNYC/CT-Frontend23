import MenuPopover from "@components/menu-popover/MenuPopover";
import { Draggable } from "@hello-pangea/dnd";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BsFillMenuButtonFill, BsThreeDotsVertical } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

interface Props {
  step: ILessonContent & BaseResponseInterface;
  index: number;
}

export default function LessonListItem({
  step,
  index,
}: Props): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
              <Typography variant="h6" gutterBottom>
                step.title title tile title title tile title
              </Typography>
              <Typography variant="body2">step.description</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton edge="end">
              <BsThreeDotsVertical size="20px" />
            </IconButton>
            <IconButton onClick={handleOpenPopover}>
              <CgMenuRight size="20px" />
            </IconButton>
          </Box>
          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            arrow="right-top"
            sx={{ width: 160 }}
          >
            <MenuItem>Dublicate</MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem>Preferences</MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem>Delete</MenuItem>
          </MenuPopover>
        </Paper>
      )}
    </Draggable>
  );
}
