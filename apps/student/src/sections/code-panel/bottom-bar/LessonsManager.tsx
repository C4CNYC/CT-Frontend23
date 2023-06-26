import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Iconify,
} from "@ct-nx/components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { PATH_PAGE } from "@routes/paths";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useGetChallangesQuery } from "src/redux/services/student/challenges-student";
import { useGetPublicCourseContentQuery } from "src/redux/services/student/public-student";
import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { CodePanelContext } from "../context/CodePanel.context";
import SkeletonDrawer from "./SkeletonDrawer";

const LessonsManager = (): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));
  const { lesson, publicPage } = useContext(CodePanelContext);
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);
  const { query, push } = useRouter();
  const { id } = query;
  const [state, setState] = useState<boolean>(false);

  const { data, isLoading } = useGetChallangesQuery(
    { id: id as string },
    { skip: !id || publicPage }
  );

  const { data: publicData, isLoading: publicIsLoading } =
    useGetPublicCourseContentQuery(
      { id: id as string },
      { skip: !id || !publicPage }
    );

  const onClick = (lessonId: string, moduleId: string): void => {
    if (query.lessonId === lessonId) return;
    setGlobalCodePanel((prev) => ({
      ...prev,
      courseId: id as string,
      unitId: moduleId,
      lessonId,
    }));
    if (publicPage) {
      push(
        `${PATH_PAGE.publicCodePanel.workSpace(
          id as string
        )}?${new URLSearchParams({
          unitId: moduleId,
        })}&${new URLSearchParams({
          lessonId,
        })}`,
        undefined,
        { shallow: true }
      );
    } else {
      push(
        `${PATH_PAGE.codePanel.workSpace(id as string)}?${new URLSearchParams({
          unitId: moduleId,
        })}&${new URLSearchParams({
          lessonId,
        })}`,
        undefined,
        { shallow: true }
      );
    }
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setState(open);
    };

  return (
    <>
      <Stack className="lessonsTour" direction="row" alignItems="center">
        <Tooltip title="LESSONS LIST" placement="top">
          <IconButton
            className="lessonsTourMobile"
            onClick={toggleDrawer(true)}
            sx={{ mr: "5px" }}
          >
            <Iconify icon="iconoir:page" />
          </IconButton>
        </Tooltip>
        <Tooltip title={lesson?.name} placement="top">
          <Typography
            noWrap
            width="175px"
            variant="body2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            {lesson?.name}
          </Typography>
        </Tooltip>
      </Stack>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <Stack sx={{ width: isMobile ? "280px" : "350px" }} p="0 0 30px">
          {isMobile && (
            <Box sx={{ pl: 1, pt: 1 }}>
              <IconButton onClick={toggleDrawer(false)}>
                <IoMdClose size="20px" />
              </IconButton>
            </Box>
          )}

          {publicPage ? (
            publicIsLoading ? (
              <SkeletonDrawer />
            ) : isLoading ? (
              <SkeletonDrawer />
            ) : null
          ) : null}
          {!publicPage
            ? !isLoading &&
              data?.units?.map((module) => (
                <>
                  <Stack key={module.id}>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        sx={{
                          pl: "10px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography variant="h6" whiteSpace="nowrap">
                          {module.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ p: 0, pl: "10px", pr: "10px" }}>
                          {!module.lessons.length ? (
                            <ListItem>No lessons</ListItem>
                          ) : null}
                          {module.lessons.map((lesson) => (
                            <ListItemButton
                              key={lesson.id}
                              onClick={() => {
                                onClick(lesson.id, module.id);
                              }}
                              sx={{
                                background:
                                  lesson.id === query.lesson_id
                                    ? "#ebe5e5"
                                    : "inherit",
                                cursor: "pointer",
                                display: "flex",
                              }}
                            >
                              <Box display="flex">
                                <Typography ml={2} variant="subtitle2">
                                  {lesson.name}
                                </Typography>
                              </Box>
                            </ListItemButton>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                  <Divider sx={{ height: 2 }} />
                </>
              ))
            : !publicIsLoading &&
              publicData?.units?.map((module: Record<string, any>) => (
                <>
                  <Stack key={module.id}>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        sx={{
                          pl: "10px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography variant="h6" whiteSpace="nowrap">
                          {module.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        <List sx={{ p: 0, pl: "10px", pr: "10px" }}>
                          {!module.lessons.length ? (
                            <ListItem>No lessons</ListItem>
                          ) : null}
                          {module.lessons.map((lesson: Record<string, any>) => (
                            <ListItemButton
                              key={lesson.id}
                              onClick={() => {
                                onClick(lesson.id, module.id);
                              }}
                              sx={{
                                background:
                                  lesson.id === query.lesson_id
                                    ? "#ebe5e5"
                                    : "inherit",
                                cursor: "pointer",
                                display: "flex",
                              }}
                            >
                              <Box display="flex">
                                <Typography ml={2} variant="subtitle2">
                                  {lesson.name}
                                </Typography>
                              </Box>
                            </ListItemButton>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                  <Divider sx={{ height: 2 }} />
                </>
              ))}
          {}
        </Stack>
      </Drawer>
    </>
  );
};

export default LessonsManager;
