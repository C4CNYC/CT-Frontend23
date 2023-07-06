import { Scrollbar } from "@components";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { AiOutlineMinus } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ICourseContent } from "src/redux/interfaces/content.interface";
import { BaseResponseInterface } from "@utils";
import CourseLayaut from "./CourseLayaut";

interface Props {
  course: ICourseContent & BaseResponseInterface;
}

export default function CourseMain({ course }: Props): React.ReactElement {
  const router = useRouter();
  return (
    <Scrollbar>
      <Box
        sx={(theme) => ({
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          borderRadius: "20px",
          [theme.breakpoints.down(1800)]: {
            pl: "10px",
            pt: "40px",
            pr: "10px",
          },
          [theme.breakpoints.up(1800)]: {
            pl: "105px",
            pt: "35px",
            pr: "40px",
          },
          pb: "187px",
          background:
            'no-repeat url("/assets/projects/btn_bg.png")  top -169px right -197px / 523px 323px, #ECF4FF',
        })}
      >
        <Container maxWidth={false} sx={{ maxWidth: "1922px" }}>
          <Button
            onClick={() => {
              router.back();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#364954",
              mb: "10px",
            }}
          >
            <MdKeyboardArrowLeft size="20px" />
            <Box sx={{ height: "20px", ml: "-7px", mr: "3px" }}>
              <AiOutlineMinus size="20px" />
            </Box>
            <Box
              sx={{
                color: "#364954",
              }}
            >
              <Typography variant="button" sx={{ textTransform: "uppercase" }}>
                back to list
              </Typography>
            </Box>
          </Button>
          <Typography variant="h4">{course?.name}</Typography>
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: "150px",
              [theme.breakpoints.down(1400)]: {
                pr: "20px",
              },
              [theme.breakpoints.down(450)]: {
                flexDirection: "column",
                pt: "20px",
              },
            })}
          >
            <Typography
              variant="body1"
              sx={(theme) => ({
                maxWidth: "624px",
                fontSize: "20px",
                [theme.breakpoints.down(1250)]: {
                  fontSize: "18px",
                },
              })}
            >
              {course?.description}
            </Typography>
          </Box>
          <CourseLayaut course={course} />
        </Container>
      </Box>
    </Scrollbar>
  );
}
