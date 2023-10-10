import NextLink from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { BiLinkExternal } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { TbFileCertificate, TbPhoto } from "react-icons/tb";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { EmptyContent, Scrollbar } from "@components";
import { IModuleContent, LastVisitedData } from "src/redux/interfaces/content.interface"
import { useGetStudentModulesLessonsQuery } from "src/redux/services/manager/courses-student";

import AuthorsSection from "./course-details/AuthorsSection";
import ModuleDescription from "./course-details/ModuleDescription";
import RankingSection from "./course-details/RankingSection";
import TeacherToolbox from "./course-details/TeacherToolbox";
import TrainingsList from "./course-details/TrainingsList";
import QuizPanel from "./course-details/quiz-panel";

interface IModuleInfoDialogProps {
  children: React.ReactElement;
  unit: IModuleContent;
  lastVisitedData?: LastVisitedData;
  setActive: Dispatch<SetStateAction<number | null>>;
  index: number;
}

export default function ModuleInfoDialog ({
  children,
  unit,
  lastVisitedData,
  setActive,
  index,
}: IModuleInfoDialogProps): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1050));
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetStudentModulesLessonsQuery(
    { id: unit.id },
    { skip: !unit.id }
  );

  useEffect(() => {
    if (data && lastVisitedData) {
      const { lastVisitedUnitId, lastVisitedLessonId } = lastVisitedData;
      data.forEach((lesson) => {
        if (lesson.id === lastVisitedLessonId && unit.id === lastVisitedUnitId) {
          setActive(index);
        }
      })
    }
  }, [data, lastVisitedData]);

  const handleClickOpen = (): void => {
    if (isDesktop) {
      return;
    }
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        PaperProps={{
          style: {
            margin: 0,
          },
        }}
        open={open}
        onClose={handleClose}
        fullScreen
      >
        <Scrollbar>
          <DialogContent
            sx={{
              position: "relative",
              height: "100vh",
            }}
          >
            <IconButton
              sx={{ background: "#FFF", mt: 2 }}
              onClick={handleClose}
            >
              <IoChevronBackOutline size="32px" color="#A6A6A6" />
            </IconButton>
            <Stack
              sx={{
                gap: 3,
                flexDirection: "row",
                display: "flex",
                maxWidth: "600px",
                m: "-40px auto 30px",
                [theme.breakpoints.down(1550)]: {
                  flexDirection: "column",
                },
              }}
            >
              <Stack>
                <ModuleDescription
                  name={unit.name}
                  desc={unit.description ?? ""}
                  isLoading={isLoading}
                />
                {data ? (
                  <TrainingsList lessons={data} unitId={unit.id} />
                ) : (
                  <EmptyContent title="no data" />
                )}
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
                  }}
                >
                  <TbFileCertificate size={30} />
                  <Typography variant="body1">Sample Certificate</Typography>
                </Button>
                <RankingSection />
                {data ? (
                  <QuizPanel lessons={data} />
                ) : (
                  <EmptyContent title="no data" />
                )}
                <TeacherToolbox />
              </Stack>
            </Stack>
          </DialogContent>
        </Scrollbar>
      </Dialog>
    </>
  );
}
