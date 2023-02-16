import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// redux
import { useDispatch } from '../../../../redux/store';
import { deleteColumn, updateColumn, addTask, deleteTask } from '../../../../redux/slices/kanban';
// @types
import { IKanbanColumn, IKanbanCard } from '../../../../@types/kanban';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
//
import KanbanTaskAdd from '../KanbanTaskAdd';
import KanbanTaskCard from '../KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';

// ----------------------------------------------------------------------

type Props = {
  column: IKanbanColumn;
  cards: Record<string, IKanbanCard>;
  index: number;
};

export default function KanbanColumn({ column, index, cards }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = (cardId: string) => {
    dispatch(
      deleteTask({
        cardId,
        columnId: column.id,
      })
    );
    enqueueSnackbar('Delete success!');
  };

  const handleUpdateColumn = async (newName: string) => {
    try {
      if (newName !== column.name) {
        dispatch(
          updateColumn(column.id, {
            ...column,
            name: newName,
          })
        );
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(column.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
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
            borderStyle: 'dashed',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.100' : 'background.default',
          }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={column.name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
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
