import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";

import { Box, Tab, Tabs } from "@mui/material";

import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import {
  useGetLessonContentByIdQuery,
  useUpdateLessonContentMutation,
} from "src/redux/services/manager/lesson-content-manager";
import { useGetLessonIntegrationsQuery } from "src/redux/services/manager/lessons-manager";

import { LessonContentContext } from "./LessonContent.context";
import SkeletonContentCode from "./SkeletonContentCode";
import SkeletonContentMulti from "./SkeletonContentMulti";
import StepCode from "./StepCode";
import StepMultimedia from "./StepMultimedia";

export default function StepContentEditor(): React.ReactElement {
  const { lessonId, stepId } = useRouter().query;
  const { enqueueSnackbar } = useSnackbar();
  const [locked, setLocked] = useState(false);
  const [updateContent] = useUpdateLessonContentMutation();
  const { data: integrations, isLoading: isIntegrationLoading } =
    useGetLessonIntegrationsQuery(
      {
        id: lessonId as string,
      },
      { skip: !lessonId || !stepId }
    );
  const { data, isFetching, isLoading } = useGetLessonContentByIdQuery(
    {
      lessonId: lessonId as string,
      id: stepId as string,
    },
    { skip: !lessonId || !stepId }
  );

  const [bodyType, setBodyType] = useState<LessonContentType>(
    LessonContentType.Code
  );

  const onSubmit = async (body: string): Promise<void> => {
    try {
      await updateContent({
        lessonId: lessonId as string,
        id: stepId as string,
        type: bodyType,
        body,
      }).unwrap();
      enqueueSnackbar("Content updated");
    } catch (e: any) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    if (data?.type) setBodyType(data.type);
  }, [data]);

  if (isFetching || isLoading || isIntegrationLoading) {
    return bodyType === LessonContentType.Editable ? (
      <SkeletonContentMulti />
    ) : (
      <SkeletonContentCode />
    );
  }

  return (
    <LessonContentContext.Provider
      value={{
        locked,
        lockedHandler: setLocked,
      }}
    >
      <Box
        sx={{
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: "#FFF",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f4f5f7",
            px: "15px",
          }}
        >
          <Tabs
            value={bodyType}
            onChange={(event, newValue) => {
              setBodyType(newValue);
            }}
          >
            <Tab
              value={LessonContentType.Editable}
              icon={<MdOutlinePermMedia size="20px" />}
              label="multimedia"
            />
            <Tab
              value={LessonContentType.Code}
              icon={<BsCodeSlash size="20px" />}
              label="code"
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "calc(100vh - 80px)",
            overflow: "scroll",
          }}
        >
          {bodyType === LessonContentType.Editable ? (
            <StepMultimedia
              content={
                data?.type === LessonContentType.Editable ? data?.body : ""
              }
              onSubmit={onSubmit}
            />
          ) : null}
          {bodyType === LessonContentType.Code ? (
            <StepCode
              content={data?.type === LessonContentType.Code ? data?.body : ""}
              integrations={integrations ?? []}
              onSubmit={onSubmit}
            />
          ) : null}
        </Box>
      </Box>
    </LessonContentContext.Provider>
  );
}
