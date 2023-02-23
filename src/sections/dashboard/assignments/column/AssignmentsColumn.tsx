import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Paper, Stack } from "@mui/material";
import { useSnackbar } from "@components/snackbar";
import AssignmentsTaskCard from "../AssignmentsTaskCard";

// ----------------------------------------------------------------------
import {
  IAssignmentsCard,
  IAssignmentsColumn,
} from "../../../../@types/assignments";
import AssignmentsColumnToolBar from "./AssignmentsColumnToolBar";
import { useDeleteAssignmentMutation } from "../../../../redux/services/manager";

interface Props {
  column: IAssignmentsColumn;
  cards: Record<string, IAssignmentsCard>;
  index: number;
  school_id: string;
};

export default function AssignmentsColumn({
  column,
  index,
  cards,
  school_id
}:
Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const handleDeleteTask = async (assignment_id: string): Promise<void> => {
    try {
      await deleteAssignment({
        school_id,
        assignment_id,
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
              school_id={school_id}
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
                      school_id={school_id}
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
