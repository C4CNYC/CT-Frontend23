import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import { BsCodeSlash } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

import { LessonContentType } from "src/redux/services/enums/lesson-content-type.enum";
import {
  useGetLessonContentByIdQuery,
  useUpdateLessonContentMutation,
} from "src/redux/services/manager/lesson-content-manager";
import { useGetLessonIntegrationsQuery } from "src/redux/services/manager/lessons-manager";
import { useTranslate } from "src/utils/translateHelper";

import { LessonContentContext } from "./LessonContent.context";
import SkeletonContentCode from "./SkeletonContentCode";
import SkeletonContentMulti from "./SkeletonContentMulti";
import StepCode from "./StepCode";
import StepMultimedia from "./StepMultimedia";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButton-root": {
    paddingBottom: 2,
    paddingTop: 2,
    "&.Mui-selected": {
      backgroundColor: theme.palette.background.default,
      color: "#4396e6",
      "&:hover": {
        backgroundColor: theme.palette.background.default,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

export default function StepContentEditor(): React.ReactElement {
  const { lessonId, stepId } = useRouter().query;
  const { enqueueSnackbar } = useSnackbar();
  const [locked, setLocked] = useState(false);
  const translate = useTranslate();
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
      enqueueSnackbar(translate("slide_content_updated"));
    } catch (e: any) {
      enqueueSnackbar(translate("messages_error"), { variant: "error" });
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
        sx={(theme) => ({
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Box
          sx={(theme) => ({
            position: "relative",
            height: "48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: theme.palette.background.default,
            px: "15px",
          })}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              exclusive
              value={bodyType}
              onChange={(_, newValue) => {
                setBodyType(newValue);
              }}
              aria-label="select slide type"
            >
              <ToggleButton
                value={LessonContentType.Editable}
                aria-label="Standard"
                sx={{ gap: 1 }}
              >
                <MdOutlinePermMedia size="20px" /> {translate("slide_standard")}
              </ToggleButton>
              <ToggleButton
                value={LessonContentType.Code}
                aria-label="HTML"
                sx={{ gap: 1 }}
              >
                <BsCodeSlash size="20px" /> HTML
              </ToggleButton>
            </StyledToggleButtonGroup>
            <div
              style={{
                lineHeight: 0,
                gap: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <IoMdInformationCircleOutline size="14px" color="#4396e6" />
              <span
                style={{
                  opacity: 0.6,
                  fontSize: 12,
                }}
              >
                {translate("slide_select_format")}
              </span>
            </div>
          </div>
          <div
            style={{
              gap: 16,
              display: "flex",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <CgScreen size="30px" />
            {translate("preview")}
          </div>
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
              data={data!}
              lessonId={lessonId as string}
            />
          ) : null}
          {bodyType === LessonContentType.Code ? (
            <StepCode
              content={data?.type === LessonContentType.Code ? data?.body : ""}
              integrations={integrations ?? []}
              onSubmit={onSubmit}
              data={data!}
              lessonId={lessonId as string}
            />
          ) : null}
        </Box>
      </Box>
    </LessonContentContext.Provider>
  );
}
