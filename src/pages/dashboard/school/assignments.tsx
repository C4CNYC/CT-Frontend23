import { useEffect } from 'react';
// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getBoard, persistCard } from '../../../redux/slices/kanban';
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
import { AssigmentStatuses } from 'src/redux/services/enums/assigment-status.enum';
import { useGetAssigmentListQuery, useUdpateAssigmentMutation } from 'src/redux/services/manager';
import { BaseResponseInterface } from 'src/utils/baseResponce.interface';
import { IAssigment } from 'src/redux/services/interfaces/assigment.interface';
import Stepper from "../../../sections/@dashboard/kanban/createAssignment/Stepper";

// ----------------------------------------------------------------------

Assignments.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);


export default function Assignments() {
  const dispatch = useDispatch();
  const school_id = useSelector((state: RootState) => state.manager.school_id);
  const { data } = useGetAssigmentListQuery({ school_id }, { skip: !school_id })
  const [updateAssigment] = useUdpateAssigmentMutation();

  const { board } = useSelector((state) => state.kanban);


  useEffect(() => {
    if(!data) return;
    dispatch(getBoard(data));
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

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

    updateAssigment({
      assigment_id: draggableId,
      school_id,
      status: destination.droppableId as AssigmentStatuses
    })

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
                {!Object.keys(board.columns).length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  Object.values(AssigmentStatuses).map((columnId, index) => (
                    <KanbanColumn
                      school_id={school_id}
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
