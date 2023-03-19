import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import {
  useGetLessonContentByIdQuery,
  useUpdateLessonContentMutation,
} from "src/redux/services/manager/lesson-content-manager";
import SkeletonContentCode from "./SkeletonContentCode";
import SkeletonContentMulti from "./SkeletonContentMulti";
import StepCode from "./StepCode";
import StepMultimedia from "./StepMultimedia";

// interface Props {}

export default function StepContentEditor(): React.ReactElement {
  const { lessonId, stepId } = useRouter().query;
  const { enqueueSnackbar } = useSnackbar();

  const [updateContent] = useUpdateLessonContentMutation();
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
    } catch (e) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    if (data?.type) setBodyType(data.type);
  }, [data]);

  if (isFetching || isLoading) {
    return bodyType === LessonContentType.Editable ? (
      <SkeletonContentMulti />
    ) : (
      <SkeletonContentCode />
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "#FFF",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "48px",
          overflow: "hidden",
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
          height: "calc(100vh - 48px)",
          overflowY: "scroll",
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
            onSubmit={onSubmit}
          />
        ) : null}
      </Box>
    </Box>
  );
}
