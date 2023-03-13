import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import CreateDemonContent from "./CreateDemonContent";
import LessonListItem from "./LesonListItem";

interface Props {
  lessonId: string;
}

export default function LessonStepList({
  lessonId,
}: Props): React.ReactElement {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { data, isLoading } = useGetLessonContentQuery(
    { lessonId },
    { skip: !lessonId }
  );

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
  if (isLoading) return <CircularProgress />;

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
              {data?.map((el, i) => (
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
          onClick={handleOpenDialog}
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
        <CreateDemonContent open={openDialog} onClose={handleCloseDialog} />
      </Paper>
      <Stack direction="column" spacing={3} sx={{ p: 2 }}></Stack>
    </Box>
  );
}
