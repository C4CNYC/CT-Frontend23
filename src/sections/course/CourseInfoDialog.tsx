import { Scrollbar } from "@components";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CourseDescription from "./course-details/CourseDescription";
import QuizPanel from "./course-details/quiz-panel";
import TrainingsList from "./course-details/TrainingsList";
import { Unit } from "src/redux/interfaces/challenges.interface";

interface Props {
  children: React.ReactElement;
  unit: Unit;
  index: number;
}
export default function CourseInfoDialog({
  children,
  unit,
  index,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);
  const isMobile = true;

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
            sx={(theme) => ({
              background: "#ECF4FF",
              position: "relative",
              height: "100vh",
            })}
          >
            <Box
              sx={(theme) => ({
                background: "#fff",
                borderRadius: "25px",
                m: "60px auto",
                px: "20px",
                py: "10px",
                display: "block",
                width: "100%",
                maxWidth: "820px",
              })}
            >
              <Button
                onClick={handleClose}
                sx={{
                  minWidth: "auto",
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  width: "40px",
                  height: "40px",
                  background: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#A6A6A6",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <IoClose size="40px" />
              </Button>
              <CourseDescription
                name={unit.name}
                desc={unit.description ?? ""}
                index={index}
              />
              <Box
                sx={
                  !isMobile
                    ? {
                        mt: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }
                    : (theme) => ({
                        mt: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        [theme.breakpoints.down(710)]: {
                          flexWrap: "wrap",
                          justifyContent: "center",
                        },
                      })
                }
              >
                <TrainingsList lessons={unit.lessons} unitId={unit.id} />
                <QuizPanel lessons={unit.lessons} />
              </Box>
            </Box>
          </DialogContent>
        </Scrollbar>
      </Dialog>
    </>
  );
}
