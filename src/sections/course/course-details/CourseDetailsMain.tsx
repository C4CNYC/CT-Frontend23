import NextLink from "next/link";

import { AiOutlineClockCircle, AiTwotoneExperiment } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { MdCelebration } from "react-icons/md";
import { TbFileCertificate, TbPhoto } from "react-icons/tb";

import { Box, Button, Link, Skeleton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { IModuleContent } from "src/redux/interfaces/content.interface";
import { useGetStudentModulesLessonsQuery } from "src/redux/services/manager/courses-student";

import AuthorsSection from "./AuthorsSection";
import ModuleDescription from "./ModuleDescription";
import RankingSection from "./RankingSection";
import TeacherToolbox from "./TeacherToolbox";
import TrainingsList from "./TrainingsList";
import QuizPanel from "./quiz-panel";

interface ICourseDetailsMainProps {
  unit?: IModuleContent | null;
  level: string;
}

export default function CourseDetailsMain({
  unit,
  level,
}: ICourseDetailsMainProps): React.ReactElement {
  const theme = useTheme();
  const { data, isLoading } = useGetStudentModulesLessonsQuery(
    { id: unit?.id as string },
    { skip: !unit?.id }
  );

  return (
    <Stack
      sx={{
        background: "#fff",
        borderRadius: 3,
        pb: 4,
        [theme.breakpoints.down(1050)]: {
          display: "none",
        },
        width: "100%",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          background: "#FFF0F3",
          color: "#EE467A",
          borderBottomLeftRadius: "24px",
          borderTopRightRadius: "24px",
          alignSelf: "flex-end",
          py: 2,
          px: { xs: 1, sm: 2, md: 3, lg: 6 },
          gap: { md: 3, lg: 6 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AiOutlineClockCircle size="15px" style={{ marginBottom: "3px" }} />
          {isLoading ? (
            <Skeleton variant="text" sx={{ width: "33px", ml: 1 }} />
          ) : (
            <Typography variant="body1" ml={1} whiteSpace="nowrap">
              {unit?.duration ?? "9 Hr"}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AiTwotoneExperiment size="15px" style={{ marginBottom: "3px" }} />
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ width: "70px", background: "#fff", ml: 1 }}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{ ml: 1, textTransform: "capitalize" }}
              whiteSpace="nowrap"
            >
              {level}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MdCelebration size="18px" style={{ marginBottom: "4px" }} />
          {isLoading ? (
            <Skeleton variant="text" sx={{ width: "75px", ml: 1 }} />
          ) : (
            <Typography variant="body1" sx={{ ml: 1 }} whiteSpace="nowrap">
              {data?.length ?? 0} {`Training${data?.length !== 1 ? "s" : ""}`}
            </Typography>
          )}
        </Box>
      </Stack>

      <Stack
        sx={{
          px: 3,
          gap: 3,
          flexDirection: "row",
          display: "flex",
          [theme.breakpoints.down(1550)]: {
            flexDirection: "column",
          },
        }}
      >
        <Stack width="100%">
          <ModuleDescription
            name={unit?.name}
            desc={unit?.description}
            isLoading={isLoading}
          />
          <TrainingsList lessons={data} unitId={unit?.id ?? ""} />
        </Stack>
        <Stack>
          <AuthorsSection />
          <Link
            component={NextLink}
            underline="none"
            href="#"
            target="_blank"
            sx={{
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 2,
              mb: 1,
              ml: 2,
            }}
          >
            <TbPhoto size={30} />
            What you’ll build
            <BiLinkExternal size={15} />
          </Link>
          <Button
            variant="text"
            disableRipple
            sx={{
              color: "inherit",
              gap: 1,
              px: 0,
              mb: 2,
              ml: 2,
              alignSelf: "flex-start",
              "&:hover": {
                background: "none",
              },
            }}
          >
            <TbFileCertificate size={30} />
            <Typography variant="body1">Sample Certificate</Typography>
          </Button>
          <RankingSection />
          {data ? <QuizPanel lessons={data} /> : <></>}
          <TeacherToolbox />
        </Stack>
      </Stack>
    </Stack>
  );
}
