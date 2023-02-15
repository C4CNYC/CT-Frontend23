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
import { IAssigment } from 'src/redux/services/interfaces/assigment.interface';
import { BaseResponseInterface } from 'src/utils/baseResponce.interface';

// ----------------------------------------------------------------------

type Props = {
  column: string;
  cards: (IAssigment & BaseResponseInterface)[];
  index: number;
};

export default function KanbanColumn({ column, index, cards }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteTask = (cardId: string) => {
    dispatch(
      deleteTask({
        cardId,
        columnId: column,
      })
    );
    enqueueSnackbar('Delete success!');
  };

  const handleUpdateColumn = async (newName: string) => {};

  const handleDeleteColumn = async () => {};


  return (
    <Draggable draggableId={column} index={index}>
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
              columnName={column}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={column} type="task">
              {(columnProvided) => (
                <Stack
                  ref={columnProvided.innerRef}
                  {...columnProvided.droppableProps}
                  spacing={2}
                  sx={{ width: 320, pb: 4 }}
                >
                  {cards.map((assigment, assigmentIndex) => (
                    <KanbanTaskCard
                      key={assigment.id}
                      index={assigmentIndex}
                      onDeleteTask={handleDeleteTask}
                      card={assigment}
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
