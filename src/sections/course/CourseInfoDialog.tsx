import { useState } from "react";

import { IoChevronBackOutline } from "react-icons/io5";

import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

import { Scrollbar } from "@components";
import { Unit } from "src/redux/interfaces/challenges.interface";

import CourseDescription from "./course-details/CourseDescription";
import TrainingsList from "./course-details/TrainingsList";
import QuizPanel from "./course-details/quiz-panel";

interface ICourseInfoDialogProps {
  children: React.ReactElement;
  unit: Unit;
  index: number;
}
export default function CourseInfoDialog({
  children,
  unit,
  index,
}: ICourseInfoDialogProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
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
              background: "#ECF4FF",
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
            <Box
              sx={{
                background: "#fff",
                borderRadius: 3,
                m: "30px auto",
                p: 2,
                maxWidth: "600px",
              }}
            >
              <CourseDescription
                name={unit.name}
                desc={unit.description ?? ""}
                index={index}
              />

              <TrainingsList lessons={unit.lessons} unitId={unit.id} />
              <QuizPanel lessons={unit.lessons} />
            </Box>
          </DialogContent>
        </Scrollbar>
      </Dialog>
    </>
  );
}
