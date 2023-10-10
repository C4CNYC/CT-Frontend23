import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import { useAtom } from "jotai";
import { IoMdClose } from "react-icons/io";
import { RxExternalLink } from "react-icons/rx";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Iconify,
  resetLessonEvent,
} from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { useGetChallangesQuery } from "src/redux/services/manager/challenges-student";
import { useGetPublicCourseContentQuery } from "src/redux/services/public-student";

import { globalCodePanelAtom } from "../atoms/global-code-panel.atom";
import { CodePanelContext } from "../context/CodePanel.context";
import SkeletonDrawer from "./SkeletonDrawer";

const LessonManager = (): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));
  const { lesson, publicPage } = useContext(CodePanelContext);
  const [, setGlobalCodePanel] = useAtom(globalCodePanelAtom);
  const { query, push } = useRouter();
  const { id } = query;
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

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
    window.dispatchEvent(resetLessonEvent);
    if (publicPage) {
      push(
        `${STUDENT_PATH_DASHBOARD.publicCodePanel.workSpace(id as string, {
          unitId: moduleId,
          lessonId,
        })}`,
        undefined,
        { shallow: true }
      );
    } else {
      push(
        `${STUDENT_PATH_DASHBOARD.codePanel.workSpace(
          id as string
        )}?${new URLSearchParams({
          unitId: moduleId,
        })}&${new URLSearchParams({
          lessonId,
        })}`,
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <>
      <Stack
        className="lessonsTour"
        direction="row"
        alignItems="center"
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        <Tooltip title="LESSONS LIST" placement="top">
          <IconButton className="lessonsTourMobile" sx={{ mr: "5px" }}>
            <Iconify icon="iconoir:page" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={lesson?.name && lesson?.name.length > 24 ? lesson?.name : ""}
          placement="top"
        >
          <Button
            disableRipple
            disableFocusRipple
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
              p: 0,
              color: "initial",
              fontWeight: "400",
              "&:hover": {
                background: "none",
              },
              width: "175px",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                textOverflow: "ellipsis",
                overflow: " hidden",
                textTransform: "none",
              }}
            >
              {lesson?.name}
            </Typography>
          </Button>
        </Tooltip>
      </Stack>
      <Drawer
        anchor="left"
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <Stack sx={{ width: isMobile ? "280px" : "350px" }} p="0 0 30px">
          <Stack
            direction="row"
            sx={{
              bgcolor: "#ECF4FF",
              borderBottomLeftRadius: "18px",
              borderBottomRightRadius: "18px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href={
                publicPage
                  ? STUDENT_PATH_DASHBOARD.publicCourses
                  : STUDENT_PATH_DASHBOARD.courses.root
              }
              component={NextLink}
              underline="none"
              sx={{
                gap: 1,
                color: "initial",
                display: "inline-flex",
                alignItems: "center",
                py: 1,
                pl: 2,
              }}
            >
              Open Full Catalog <RxExternalLink size={18} />
            </Link>
            {isMobile && (
              <IconButton
                onClick={() => {
                  setIsOpenDrawer(false);
                }}
                sx={{ mr: 1 }}
              >
                <IoMdClose size="20px" />
              </IconButton>
            )}
          </Stack>

          {publicIsLoading || isLoading ? <SkeletonDrawer /> : null}
          {!publicPage
            ? !isLoading &&
              data?.units?.map((module) => (
                <Stack key={module.id}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      sx={{
                        pl: "10px",
                      }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Tooltip
                        title={module.name.length > 39 ? module.name : ""}
                      >
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{
                            textOverflow: "ellipsis",
                            width: isMobile ? "220px" : "300px",
                          }}
                        >
                          {module.name}
                        </Typography>
                      </Tooltip>
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
                  <Divider sx={{ height: 2 }} />
                </Stack>
              ))
            : !publicIsLoading &&
              publicData?.units?.map((module: Record<string, any>) => (
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
                  <Divider sx={{ height: 2 }} />
                </Stack>
              ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default LessonManager;
