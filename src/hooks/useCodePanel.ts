
// node modules
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";

// @mui
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// local files
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { isValidLastVisitedData } from "@sections/code-editor-panel/helpers";
import { getNextLessonId } from "@sections/code-editor-panel/utils/navigation";
import { useAuthContext } from "src/auth/useAuthContext";
import { useGetChallangesQuery } from "src/redux/services/manager/challenges-student";
import {
  useGetLessonContentStudentQuery,
  useGetLessonStudentQuery,
  useUpdateStudentLastVisitedDataMutation,
} from "src/redux/services/manager/lesson-student";
import { useCompleteLessonMutation } from "src/redux/services/manager/progress-student";
import {
  setUnitId,
  setLessonId,
  setCourseId,
  setSlideIndex,
} from "src/redux/slices/code-panel-global"
import { resetLessonEvent } from "@components";

// @types
import type { LastVisitedState } from "src/redux/interfaces/content.interface";
import type Confetti from "react-confetti/dist/types/Confetti";
import type { WorkSpaceProps } from "@sections/code-editor-panel/work-space";
import type { BottomBarProps } from "@sections/code-editor-panel/bottom-bar";
import type { RootState } from "src/redux/store";
import { type LessonManagerProps } from "@sections/code-editor-panel/bottom-bar/lesson-manager";

interface UseCodePanelReturn {
  workSpaceProps: WorkSpaceProps
  lessonManagerProps: LessonManagerProps
  bottomBarProps: Omit<BottomBarProps, "lessonManagerComponent">
  isLoadingComplete: boolean
  handle: FullScreenHandle
  isDesktop: boolean
  confetti: boolean
  onConfettiComplete: (confetti?: Confetti) => void
}

const LANGUAGE = "html"

export const useCodePanel = (): UseCodePanelReturn => {
  const dispatch = useDispatch()
  const savedUnitId = useSelector((state: RootState) => state.codePanelGlobal.unitId)
  const savedLessonId = useSelector((state: RootState) => state.codePanelGlobal.lessonId)
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const { enqueueSnackbar } = useSnackbar();
  const handle = useFullScreenHandle();
  const { push, query, replace } = useRouter();
  const { user } = useAuthContext();
  const searchParams = useSearchParams();

  const [confetti, setConfetti] = useState(false);
  const [code, setCode] = useState<string>("");

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [lastVisitedData, setLastVisitedData] = useState<LastVisitedState>({
    unitId: null,
    lessonId: null,
  });
  const unitId = searchParams.get("unitId");
  const lessonId = searchParams.get("lessonId");

  const onChangeCode = useCallback((code: string) => {
    setCode(code);
    window.localStorage.setItem(`code-${query.id}-${query.lessonId}`, code);
  }, []);

  const [completeLesson] = useCompleteLessonMutation();
  const [updateLastVisitedDataTrigger] =
    useUpdateStudentLastVisitedDataMutation();

  const { data, isLoading, isFetching } = useGetLessonContentStudentQuery(
    { id: query.lessonId as string },
    { skip: !query.lessonId }
  );
  const { data: courseContent, isLoading: isLoadingCourseContent } =
    useGetChallangesQuery({ id: query.id as string }, { skip: !query.id });

  const { data: lesson, isLoading: isLoadingLesson } = useGetLessonStudentQuery(
    {
      id: query.lessonId as string,
    },
    { skip: !query.lessonId }
  );

  const onConfettiComplete = (confetti?: Confetti) => {
    setConfetti(false);
    confetti?.reset();
  }

  const onOpenLesson = (lessonId: string, unitId: string): void => {
    dispatch(setLessonId(lessonId))
    dispatch(setUnitId(unitId))
    dispatch(setCourseId(query.id as string))

    replace(
      `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
        courseContent?.id as string
      )}?${new URLSearchParams({ unitId })}&${new URLSearchParams({
        lessonId,
      })}`,
      undefined,
      { shallow: true }
    );
  };

  const updateLastVisitedData = async () => {
    if (isValidLastVisitedData(lastVisitedData)) {
      await updateLastVisitedDataTrigger(lastVisitedData).unwrap();
    }
  };

  const onChooseLesson = (lessonId: string, unitId: string) => {
    if (query.lessonId === lessonId) return;

    window.dispatchEvent(resetLessonEvent);

    onOpenLesson(lessonId, unitId)
  };

  useEffect(() => {
    if (!courseContent) return;

    if (!savedLessonId && !savedUnitId) {
      const nextLessonId = courseContent.units[0].lessons[0].id
      const nextUnitId = courseContent.units[0].id

      if (!nextLessonId || !nextUnitId) {
        push(STUDENT_PATH_DASHBOARD.page404);
      }

      onOpenLesson(nextLessonId, nextUnitId);
    } else {
      onOpenLesson(savedLessonId, savedUnitId);
    }
  }, [courseContent]);

  const onSubmitChalange = async (lessonContentId: string): Promise<void> => {
    try {
      await completeLesson({
        id: query.id as string,
        module_id: query.unit_id as string,
        lesson_content_id: lessonContentId,
      }).unwrap();
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  const onSubmitLesson = async (): Promise<void> => {
    setConfetti(true);
    try {
      enqueueSnackbar("lesson successfuly complete");
      if (!courseContent) return;
      const nextLessonInfo = getNextLessonId(
        courseContent.units,
        query.lessonId as string,
        query.unitId as string
      );

      if (nextLessonInfo) {
        const pathStr = nextLessonInfo.path.split("/");
        push(
          `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
            courseContent?.id
          )}?${new URLSearchParams({
            unitId: pathStr[0],
          })}&${new URLSearchParams({
            lessonId: pathStr[1],
          })}`,
          undefined,
          { shallow: true }
        ).then(() => {
          dispatch(setUnitId(pathStr[0]))
          dispatch(setLessonId(pathStr[1]))
          dispatch(setSlideIndex(0))
        });
      } else {
        enqueueSnackbar("course successfuly complete");
      }
    } catch (e: any) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    if (!query.id) {
      push(STUDENT_PATH_DASHBOARD.page404);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoadingCourseContent && !isLoadingLesson) {
      setIsLoadingComplete(true);
    }
  }, [isLoading, isLoadingCourseContent, isLoadingLesson]);

  useEffect(() => {
    setLastVisitedData({
      unitId,
      lessonId,
    });
  }, [unitId, lessonId]);

  useEffect(() => {
    return () => {
      updateLastVisitedData();
    };
  }, [lastVisitedData]);

  return {
    isLoadingComplete,
    handle,
    isDesktop,
    confetti,
    onConfettiComplete,
    workSpaceProps: {
      isFetching,
      lesson,
      data: data ?? [],
      user: user?.student_profile,
      code,
      language: LANGUAGE,
      onChangeCode,
      onSubmitChalange,
      onSubmitLesson,
    },
    bottomBarProps: {
      language: LANGUAGE,
      sliderSteps: data?.length ?? 0,
      code
    },
    lessonManagerProps: {
      onChooseLesson,
      lesson,
      linkHref: STUDENT_PATH_DASHBOARD.courses.root,
      data: courseContent,
      isLoading: isLoadingCourseContent
    }
  }
}
