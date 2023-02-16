import { useEffect } from 'react';
// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBoard, persistColumn, persistCard } from '../../../redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { SkeletonKanbanColumn } from '../../../components/skeleton';
// sections
import { KanbanColumn, KanbanColumnAdd } from '../../../sections/@dashboard/kanban';
import SchoolDashboardLayout from "../../../layouts/dashboard/SchoolDashboardLayout";
import UserProfilePage from "./general";

// ----------------------------------------------------------------------

Assignments.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);


export default function Assignments() {
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.kanban);


  console.log(board)
  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);

      newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];

      updatedCardIds.splice(source.index, 1);

      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];

    startCardIds.splice(source.index, 1);

    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];

    finishCardIds.splice(destination.index, 0, draggableId);

    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  return (
    <>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <CustomBreadcrumbs
          heading="Assignments"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Assignments' },
          ]}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  height: 1,
                  overflowY: 'hidden',
                  ...hideScrollbarX,
                }}
              >
                {!board.columnOrder.length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  board.columnOrder.map((columnId, index) => (
                    <KanbanColumn
                      index={index}
                      key={columnId}
                      column={board.columns[columnId]}
                      cards={board.cards}
                    />
                  ))
                )}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
