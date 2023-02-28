import { useSnackbar } from "@components/snackbar";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Paper, Stack } from "@mui/material";
import AssignmentsTaskCard from "../AssignmentsTaskCard";

// ----------------------------------------------------------------------
import {
  IAssignmentsCard,
  IAssignmentsColumn,
} from "../../../../@types/assignments";
import { useDeleteAssignmentMutation } from "../../../../redux/services/manager/assignments-manager";
import AssignmentsColumnToolBar from "./AssignmentsColumnToolBar";

interface Props {
  column: IAssignmentsColumn;
  cards: Record<string, IAssignmentsCard>;
  index: number;
  schoolId: string;
}

export default function AssignmentsColumn({
  column,
  index,
  cards,
  schoolId,
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const handleDeleteTask = async (assignmentId: string): Promise<void> => {
    try {
      await deleteAssignment({
        schoolId,
        assignmentId,
      }).unwrap();
      enqueueSnackbar("Assignment deleted");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <Draggable draggableId={column.id} index={index} isDragDisabled>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{
            px: 2,
            borderRadius: 1,
            borderStyle: "dashed",
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "grey.100"
                : "background.default",
          }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <AssignmentsColumnToolBar
              schoolId={schoolId}
              columnName={column.name}
              onDelete={() => {}}
              onUpdate={() => {}}
            />

            <Droppable droppableId={column.id} type="task">
              {(columnProvided) => (
                <Stack
                  ref={columnProvided.innerRef}
                  {...columnProvided.droppableProps}
                  spacing={2}
                  sx={{ width: 320, pb: 4 }}
                >
                  {column.cardIds.map((cardId, cardIndex) => (
                    <AssignmentsTaskCard
                      schoolId={schoolId}
                      key={cardId}
                      index={cardIndex}
                      onDeleteTask={handleDeleteTask}
                      card={cards[cardId]}
                    />
                  ))}
                  {columnProvided.placeholder}
                </Stack>
              )}
            </Droppable>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
