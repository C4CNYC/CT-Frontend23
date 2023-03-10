import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LessonListItem from "./LesonListItem";

const list = [
  { name: "Task name", desc: "Some description of the task", id: "12asd" },
  { name: "Task name", desc: "Some description of the task", id: "13fdsa" },
  { name: "Task name", desc: "Some description of the task", id: "14asd" },
  { name: "Task name", desc: "Some description of the task", id: "15dfdsf" },
];

export default function LessonStepList(): React.ReactElement {
  const [data, setData] = useState(list);

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;
    console.log(typeof draggableId);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTaskIds = [...data];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    setData(newTaskIds);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ pl: 1 }}>
        Lesson Name
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stepList">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              spacing={3}
              sx={{ py: 2 }}
            >
              {data.map((el, i) => (
                <LessonListItem key={el.id} step={el} index={i} />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          justifyContent: "center",
          alighItems: "center",
          padding: 3,
          margin: "0px auto",
          maxWidth: "350px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alighItems: "center",
          }}
        >
          <AddIcon />
          <Typography variant="subtitle1">ADD STEP</Typography>
        </Button>
      </Paper>
      <Stack direction="column" spacing={3} sx={{ p: 2 }}></Stack>
    </Box>
  );
}
