import { useEffect } from 'react';
// @mui
import { CircularProgress, Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
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
import { useGetAssigmentListQuery, useUdpateAssigmentMutation } from 'src/redux/services/manager';
import { AssigmentStatuses } from 'src/redux/services/enums/assigment-status.enum';
import { BaseResponseInterface } from 'src/utils/baseResponce.interface';
import { IAssigment } from 'src/redux/services/interfaces/assigment.interface';

// ----------------------------------------------------------------------

Assignments.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);


export default function Assignments() {
  const school_id = useSelector((state: RootState) => state.manager.school_id)
  const { data } = useGetAssigmentListQuery({ school_id }, { skip: !school_id });
  const [ updateAssigment ] = useUdpateAssigmentMutation();

  const getDataByColumn = (column: keyof typeof AssigmentStatuses, data: (IAssigment & BaseResponseInterface)[]) => {
    return data.filter(c => c.status === AssigmentStatuses[column])
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId: assigment_id, type } = result;

    if (!destination || type !== "task") return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    await updateAssigment({
      school_id,
      assigment_id,
      status: AssigmentStatuses[destination?.droppableId as keyof typeof AssigmentStatuses]
    })
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
                {!data?.length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  Object.keys(AssigmentStatuses).map((columnId, index) => (
                    <KanbanColumn
                      index={index}
                      key={columnId}
                      column={columnId}
                      cards={getDataByColumn(columnId as keyof typeof AssigmentStatuses, data)}
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
