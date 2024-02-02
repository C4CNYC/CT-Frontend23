import { useRouter } from "next/router";
import { useEffect } from "react";

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { ImPlus } from "@react-icons/all-files/im/ImPlus";
import * as _ from "lodash-es";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";

import SkeletonList from "@sections/dashboard/lessons/LessonStep/Modals/SkeletonList";
import { BaseResponseInterface } from "@utils";
import { ILessonContent } from "src/redux/services/interfaces/courseUnits.interface";
import {
  useCreateLessonContentMutation,
  useGetLessonContentQuery,
  useRemoveLessonContentMutation,
  useUpdateLessonContentMutation,
} from "src/redux/services/manager/lesson-content-manager";
import { useGetLessonQuery } from "src/redux/services/manager/lessons-manager";
import { useGetModuleWithLessonsQuery } from "src/redux/services/manager/modules-student";
import { getBoard, persistCard } from "src/redux/slices/lesson-steps";
import { getLessonsBoard } from "src/redux/slices/module-organizing";
import { RootState, useDispatch } from "src/redux/store";
import { getOrder } from "src/utils/getTaskOrder";
import { useTranslate } from "src/utils/translateHelper";

import ModuleLessonItem from "./ModuleLessonItem";

// import CreateLessonDialog from "../CreateLessonDialog/CreateLessonDialog";
// import LessonListItem from "./LesonListItem";
// import CreateDemonContent from "./Modals/CreateLessonContent";
// import SkeletonList from "./Modals/SkeletonList";

interface Props {
  moduleId: string;
}

export default function ModuleLessonList({
  moduleId,
}: Props): React.ReactElement {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const translate = useTranslate();

  // const [updateLessonContent] = useUpdateLessonContentMutation();
  // const [createLessonContent, { isLoading: createLessonLoading }] =
  //   useCreateLessonContentMutation();
  // const [removeLessonContent] = useRemoveLessonContentMutation();

  const { data: module, isLoading: isLoadingModule } =
    useGetModuleWithLessonsQuery({ id: moduleId }, { skip: !moduleId });
  //   const { data, isLoading } = useGetLessonContentQuery(
  //     { moduleId },
  //     { skip: !moduleId }
  //   );

  const { board1 } = useSelector((state: RootState) => state.moduleLesson);

  console.log("board", board1);

  useEffect(() => {
    if (!module) return;
    dispatch(getLessonsBoard(module.lessons));
  }, [module]);

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = board1.columns.contents;
    const finish = board1.columns.contents;
    const updatedCardIds = [...start.cardIds];

    updatedCardIds.splice(source.index, 1);

    updatedCardIds.splice(destination.index, 0, draggableId);

    const updatedColumn = {
      ...start,
      cardIds: updatedCardIds,
    };

    dispatch(
      persistCard({
        ...board1.columns,
        [updatedColumn.id]: updatedColumn,
      })
    );

    // updateLessonContent({
    //   lessonId,
    //   id: draggableId,
    //   meta: {
    //     order: getOrder(result, finish, board.cards, true),
    //   },
    // });
  };

  const cardIds = board1?.columns.contents?.cardIds;
  const idCardWithMaxOrder = cardIds?.length
    ? cardIds[cardIds.length - 1]
    : null;
  // const newContentOrder = idCardWithMaxOrder
  //   ? parseFloat(board1.cards[idCardWithMaxOrder].meta.order as string) + 1
  //   : 1;

  const onRemove = async (id: string): Promise<void> => {
    //   try {
    //     await removeLessonContent({
    //       lessonId,
    //       id,
    //     }).unwrap();
    //     enqueueSnackbar(translate("step_removed"));
    //   } catch (e: any) {
    //     enqueueSnackbar(translate("step_cant_removed"), {
    //       variant: "error",
    //     });
    //   }
  };

  //   if (isLoading || isLessonLoading) return <SkeletonList />;

  return (
    <Box sx={{ p: 2 }}>
      <Stack sx={{ gap: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ pl: 1, fontWeight: 500, fontSize: "1.1rem" }}
        >
          {module?.name}
        </Typography>

        {/* <CreateLessonDialog
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
            {translate("lesson_settup_settings")}
          </Button>
        </CreateLessonDialog> */}

        <LoadingButton
          loading={isLoadingModule}
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
          //   onClick={() => createNewContent()}
          disabled={isLoadingModule}
        >
          <ImPlus size="22px" />
          <Typography variant="subtitle1">Add Lesson</Typography>
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
              {board1.columns.contents?.cardIds.map((el, i) => (
                <ModuleLessonItem
                  onRemove={onRemove}
                  //   onDublicate={onDublicate}
                  title={board1.cards[el].name}
                  //   lessonId={lessonId}
                  key={i}
                  step={board1.cards[el].id}
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
