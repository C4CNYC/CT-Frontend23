import CustomBreadcrumbs from "@components/custom-breadcrumbs";
import { SkeletonKanbanColumn } from "@components/skeleton/SkeletonKanbanColumn";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import SchoolDashboardLayout from "@layouts/dashboard/SchoolDashboardLayout";
import { Container, Stack } from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import AssignmentColumn from "@sections/dashboard/assignments/column/AssignmentsColumn";
import { useEffect } from "react";
import { AssignmentStatuses } from "src/redux/services/enums/assignment-status.enum";
import {
  useGetAssignmentListQuery,
  useUdpateAssignmentMutation,
} from "src/redux/services/manager/assignments-manager";
import { getOrder } from "src/utils/getTaskOrder";
import { getBoard, persistCard } from "../../../../redux/slices/assignments";
import { RootState, useDispatch, useSelector } from "../../../../redux/store";
import { hideScrollbarX } from "../../../../utils/cssStyles";
import FilterAssignments from "./filter";

// ----------------------------------------------------------------------

Index.getLayout = (page: React.ReactElement) => (
  <SchoolDashboardLayout>{page}</SchoolDashboardLayout>
);

export default function Index(): React.ReactElement {
  const dispatch = useDispatch();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { data } = useGetAssignmentListQuery({ schoolId }, { skip: !schoolId });
  const [updateAssignment] = useUdpateAssignmentMutation();

  const { board } = useSelector((state) => state.assignments);

  useEffect(() => {
    if (!data) return;
    dispatch(getBoard(data));
  }, [data]);

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;

    if (!destination || type !== "task") return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
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

      updateAssignment({
        assignmentId: draggableId,
        schoolId,
        meta: {
          order: getOrder(result, finish, board.cards, start.id === finish.id),
        },
      });
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
    updateAssignment({
      assignmentId: draggableId,
      schoolId,
      status: destination.droppableId as AssignmentStatuses,
      meta: {
        order: getOrder(result, finish, board.cards, start.id === finish.id),
      },
    });
  };

  return (
    <>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <CustomBreadcrumbs
          heading="Assignments"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            { name: "Assignments", href: PATH_DASHBOARD.school.assignments },
          ]}
        />
        <Stack display="flex" marginLeft="-25px" marginBottom="20px">
          <FilterAssignments />
        </Stack>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  height: 1,
                  overflowY: "hidden",
                  ...hideScrollbarX,
                }}
              >
                {!Object.keys(board.columns).length
? (
                  <SkeletonKanbanColumn />
                )
: (
                  Object.values(AssignmentStatuses).map((columnId, index) => (
                    <AssignmentColumn
                      schoolId={schoolId}
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
