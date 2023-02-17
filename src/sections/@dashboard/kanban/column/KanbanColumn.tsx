import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
// @mui
import { Paper, Stack, Button } from "@mui/material";
// redux
import { useDispatch } from "../../../../redux/store";
import {
  deleteColumn,
  updateColumn,
  addTask,
  deleteTask,
} from "../../../../redux/slices/kanban";
// components
import Iconify from "../../../../components/iconify";
import { useSnackbar } from "../../../../components/snackbar";
//
import KanbanTaskAdd from "../KanbanTaskAdd";
import KanbanTaskCard from "../KanbanTaskCard";
import { AssigmentStatuses } from "src/redux/services/enums/assigment-status.enum";

// ----------------------------------------------------------------------
import { IKanbanColumn, IKanbanCard } from "../../../../@types/kanban";
import KanbanColumnToolBar from "./KanbanColumnToolBar";
import { useDeleteAssigmentMutation } from "../../../../redux/services/manager";

type Props = {
  column: IKanbanColumn;
  cards: Record<string, IKanbanCard>;
  index: number;
  school_id: string;
};

export default function KanbanColumn({
  column,
  index,
  cards,
  school_id,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteAssignment] = useDeleteAssigmentMutation();

  const handleDeleteTask = async (assigment_id: string) => {
    try {
      await deleteAssignment({
        school_id,
        assigment_id,
      }).unwrap();
      enqueueSnackbar("Assignment deleted");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
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
            <KanbanColumnToolBar
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
                    <KanbanTaskCard
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
