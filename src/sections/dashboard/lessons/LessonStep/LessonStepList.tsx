import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import LessonListItem from "./LesonListItem";

interface Props {
  lessonId: string
}

export default function LessonStepList({ lessonId }: Props): React.ReactElement {
  const { data, isLoading } = useGetLessonContentQuery({ lessonId }, { skip: !lessonId })

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination || !data) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTaskIds = [...data];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
  };
  if (isLoading) return <CircularProgress/>

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
              {data?.map((el, i) => (
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
