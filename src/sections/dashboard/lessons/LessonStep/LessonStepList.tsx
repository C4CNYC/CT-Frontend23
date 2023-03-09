import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Stack, Typography } from "@mui/material";
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
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ pt: 2, pl: 3 }}>
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
              sx={{ p: 2 }}
            >
              {data.map((el, i) => (
                <LessonListItem key={el.id} step={el} index={i} />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Stack direction="column" spacing={3} sx={{ p: 2 }}></Stack>
    </>
  );
}
