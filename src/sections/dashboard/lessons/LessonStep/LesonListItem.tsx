import { Draggable } from "@hello-pangea/dnd";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
import { IoMdCopy } from "react-icons/io";
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
              <Typography variant="h6">{step.title}</Typography>
              <Typography variant="body2">{step.description}</Typography>
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
      )}
    </Draggable>
  );
}
