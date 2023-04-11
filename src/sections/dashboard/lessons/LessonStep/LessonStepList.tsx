import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
  useRemoveLessonContentMutation,
  useUpdateLessonContentMutation,
} from "src/redux/services/manager/lesson-content-manager";
import { useGetLessonQuery } from "src/redux/services/manager/lessons-manager";
import { getBoard, persistCard } from "src/redux/slices/lesson-steps";
import { RootState, useDispatch } from "src/redux/store";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { getOrder } from "src/utils/getTaskOrder";
import CreateLessonDialog from "../CreateLessonDialog/CreateLessonDialog";
import LessonListItem from "./LesonListItem";
import CreateDemonContent from "./Modals/CreateLessonContent";
import SkeletonList from "./Modals/SkeletonList";

interface Props {
  lessonId: string;
}

export default function LessonStepList({
  lessonId,
}: Props): React.ReactElement {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [updateLessonContent] = useUpdateLessonContentMutation();
  const [createLessonContent] = useCreateLessonContentMutation();
  const [removeLessonContent] = useRemoveLessonContentMutation();
  const { data: lesson, isLoading: isLessonLoading } = useGetLessonQuery(
    { id: lessonId },
    { skip: !lessonId }
  );
  const { data, isLoading } = useGetLessonContentQuery(
    { lessonId },
    { skip: !lessonId }
  );

  const { board } = useSelector((state: RootState) => state.lessonSteps);

  useEffect(() => {
    if (!data) return;
    dispatch(getBoard(data));
  }, [data]);

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = board.columns.contents;
    const finish = board.columns.contents;
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

    updateLessonContent({
      lessonId,
      id: draggableId,
      meta: {
        order: getOrder(result, finish, board.cards, true),
      },
    });
  };

  const cardIds = board?.columns.contents?.cardIds;
  const idCardWithMaxOrder = cardIds?.length
    ? cardIds[cardIds.length - 1]
    : null;
  const newContentOrder = idCardWithMaxOrder
    ? parseFloat(board.cards[idCardWithMaxOrder].meta.order as string) + 1
    : 1;
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const onDublicate = async (
    data: ILessonContent & BaseResponseInterface
  ): Promise<void> => {
    try {
      await createLessonContent({
        lessonId,
        ..._.omit(data, [
          "id",
          "meta",
          "createdAt",
          "updatedAt",
          "cover",
          "title",
        ]),
        title: `${data.title} (Copy)`,
        meta: { order: newContentOrder },
      }).unwrap();
      enqueueSnackbar(`Step ${data.title} dublicated`);
    } catch (e) {
      enqueueSnackbar("Sorry we can't dublicate at this moment", {
        variant: "error",
      });
    }
  };

  const onRemove = async (id: string): Promise<void> => {
    try {
      await removeLessonContent({
        lessonId,
        id,
      }).unwrap();
      enqueueSnackbar("Step removed");
    } catch (e) {
      enqueueSnackbar("Sorry we can't remove at this moment", {
        variant: "error",
      });
    }
  };
  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
    event.stopPropagation();
    event.preventDefault();
  };
  if (isLoading || isLessonLoading) return <SkeletonList />;
  return (
    <Box sx={{ p: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pb="15px"
      >
        <Typography variant="subtitle1" sx={{ pl: 1 }}>
          {lesson?.name}
        </Typography>
        <IconButton
          color={openPopover ? "inherit" : "default"}
          onClick={handleOpenPopover}
          sx={{ mr: "2px", pt: "5px", pb: "5px" }}
          edge="end"
        >
          <CreateLessonDialog
            id={lesson?.id}
            defaultValues={{
              name: lesson?.name as string,
              description: lesson?.description as string,
              active: lesson?.active,
            }}
          >
            <BsThreeDotsVertical size="20px" />
          </CreateLessonDialog>
        </IconButton>
      </Box>
      <CreateDemonContent lessonId={lessonId} order={newContentOrder}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            mb: 1,
            p: 2,
            display: "flex",
            justifyContent: "center",
            alighItems: "center",
          }}
        >
          <AddIcon />
          <Typography variant="subtitle1">ADD STEP</Typography>
        </Button>
      </CreateDemonContent>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="contents">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              spacing={3}
              sx={{ py: 2 }}
            >
              {board.columns.contents?.cardIds.map((el, i) => (
                <LessonListItem
                  onRemove={onRemove}
                  onDublicate={onDublicate}
                  lessonId={lessonId}
                  key={board.cards[el]?.meta?.order}
                  step={board.cards[el]}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Stack direction="column" spacing={3} sx={{ p: 2 }}></Stack>
    </Box>
  );
}
