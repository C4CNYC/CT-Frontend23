import NextLink from "next/link";
import { useState } from "react";

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

import { Scrollbar } from "@components";
import { Unit } from "src/redux/interfaces/challenges.interface";

import AuthorsSection from "./course-details/AuthorsSection";
import ModuleDescription from "./course-details/ModuleDescription";
import RankingSection from "./course-details/RankingSection";
import TeacherToolbox from "./course-details/TeacherToolbox";
import TrainingsList from "./course-details/TrainingsList";
import QuizPanel from "./course-details/quiz-panel";

interface IModuleInfoDialogProps {
  children: React.ReactElement;
  unit: Unit;
}
export default function ModuleInfoDialog({
  children,
  unit,
}: IModuleInfoDialogProps): React.ReactElement {
  const theme = useTheme();
  const isDecktop = useMediaQuery(theme.breakpoints.up(1050));
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    if (isDecktop) {
      return;
    }
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

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
                p: 3,
                gap: 3,
                flexDirection: "row",
                display: "flex",
                maxWidth: "600px",
                m: "0 auto",
                [theme.breakpoints.down(1550)]: {
                  flexDirection: "column",
                },
              }}
            >
              <Stack>
                <ModuleDescription
                  name={unit.name}
                  desc={unit.description ?? ""}
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
          </DialogContent>
        </Scrollbar>
      </Dialog>
    </>
  );
}
