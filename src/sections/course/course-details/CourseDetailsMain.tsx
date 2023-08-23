import NextLink from "next/link";

import { AiOutlineClockCircle } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { MdCelebration } from "react-icons/md";
import { TbFileCertificate, TbPhoto } from "react-icons/tb";

import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { Unit } from "src/redux/interfaces/challenges.interface";

import AuthorsSection from "./AuthorsSection";
import CourseDescription from "./CourseDescription";
import RankingSection from "./RankingSection";
import TeacherToolbox from "./TeacherToolbox";
import TrainingsList from "./TrainingsList";
import QuizPanel from "./quiz-panel";

interface ICourseDetailsMainProps {
  unit: Unit;
  level: string;
  index: number;
}

export default function CourseDetailsMain({
  unit,
  level,
  index,
}: ICourseDetailsMainProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        background: "#fff",
        borderRadius: 3,
        pb: 4,
        [theme.breakpoints.down(1050)]: {
          display: "none",
        },
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
          <Typography variant="body1" ml={1} whiteSpace="nowrap">
            9 Hr
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AiOutlineClockCircle size="15px" style={{ marginBottom: "3px" }} />
          <Typography
            variant="body1"
            sx={{ ml: 1, textTransform: "capitalize" }}
            whiteSpace="nowrap"
          >
            {level}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MdCelebration size="18px" style={{ marginBottom: "4px" }} />
          <Typography variant="body1" sx={{ ml: 1 }} whiteSpace="nowrap">
            {unit.lessons.length}{" "}
            {`Training${unit.lessons.length !== 1 ? "s" : ""}`}
          </Typography>
        </Box>
      </Stack>

      <Stack
        sx={{
          px: 3,
          gap: 3,
          flexDirection: "row",
          display: "flex",
          [theme.breakpoints.down(1400)]: {
            flexDirection: "column",
          },
        }}
      >
        <Stack>
          <CourseDescription
            name={unit.name}
            desc={unit.description ?? ""}
            index={index}
          />
          <TrainingsList lessons={unit.lessons} unitId={unit.id} />
        </Stack>
        <Stack
          sx={{
            width: "270px",
            [theme.breakpoints.down(1400)]: {
              width: "auto",
              margin: "0 auto",
            },
          }}
        >
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
            }}
          >
            <TbFileCertificate size={30} />
            <Typography variant="body1">Sample Certificate</Typography>
          </Button>
          <RankingSection />
          <QuizPanel lessons={unit.lessons} />
          <TeacherToolbox />
        </Stack>
      </Stack>
    </Stack>
  );
}
