import { useEffect } from "react";

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { FiSettings } from "react-icons/fi";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";

import { Box, Button, Stack, Typography } from "@mui/material";

import { BaseResponseInterface } from "@utils";
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
import { getOrder } from "src/utils/getTaskOrder";

import CreateLessonDialog from "../CreateLessonDialog/CreateLessonDialog";
import LessonListItem from "./LesonListItem";
import CreateDemonContent from "./Modals/CreateLessonContent";
import SkeletonList from "./Modals/SkeletonList";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

interface Props {
  lessonId: string;
}

export default function LessonStepList({
  lessonId,
}: Props): React.ReactElement {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [updateLessonContent] = useUpdateLessonContentMutation();
  const [createLessonContent, { isLoading: createLessonLoading }] = useCreateLessonContentMutation();
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

  const createNewContent = async (): Promise<void> => {
    try {
      const { id: stepId } = await createLessonContent({
        lessonId,
        title: 'Slide',
        meta: { order: newContentOrder },
      }).unwrap();
      enqueueSnackbar("Step created");
      router.push(
        `${router.pathname}?${new URLSearchParams({
          ...router.query,
          stepId: stepId,
        })}`,
        undefined,
        { shallow: true }
      );
    } catch (e: any) {
      enqueueSnackbar("Sorry we can't create at this moment", {
        variant: "error",
      });
    }
  }

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
    } catch (e: any) {
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
    } catch (e: any) {
      enqueueSnackbar("Sorry we can't remove at this moment", {
        variant: "error",
      });
    }
  };

  if (isLoading || isLessonLoading) return <SkeletonList />;

  return (
    <Box sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ pl: 1, fontWeight: 500, fontSize: "1.1rem" }}
        >
          {lesson?.name}
        </Typography>

        <CreateLessonDialog
          id={lesson?.id}
          defaultValues={{
            name: lesson?.name as string,
            description: lesson?.description as string,
            active: lesson?.active as boolean,
            tips: "",
            independent: lesson?.independent ?? false,
            type: lesson?.type ?? "practical",
          }}
          lessonTips={lesson?.tips ?? []}
          isEdit
        >
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              p: 1.5,
              fontWeight: 500,
              fontSize: "1rem",
              whiteSpace: "nowrap",
              gap: 1,
            }}
          >
            <FiSettings size="20px" />
            LESSON SETUP & SETTINGS
          </Button>
        </CreateLessonDialog>

        <LoadingButton
          loading={createLessonLoading}
          variant="outlined"
          fullWidth
          sx={{
            mb: 1,
            p: 2,
            gap: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => createNewContent()}
          disabled={createLessonLoading}
        >
          <ImPlus size="22px" />
          <Typography variant="subtitle1">ADD SLIDE</Typography>
        </LoadingButton>
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="contents">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              spacing={1}
              sx={{ py: 1 }}
            >
              {board.columns.contents?.cardIds.map((el, i) => (
                <LessonListItem
                  onRemove={onRemove}
                  onDublicate={onDublicate}
                  lessonId={lessonId}
                  key={board.cards[el]?.meta?.order + i}
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
