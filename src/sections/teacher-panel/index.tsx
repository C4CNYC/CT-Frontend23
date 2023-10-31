import { Stack } from "@mui/system";

import { ResizerUi } from "@components";

import { CodePanel } from "./code-panel";
import { QuickRabbits } from "./quick-rabbits";
import { TopBar } from "./top-bar";
import { SocketContext } from "../../context/socket-context";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../../auth/useAuthContext";
import { useGetAssignmentListStudentQuery } from "../../redux/services/manager/assignments-student";
import { useRouter } from "next/router";
import { useGetCourseContentListQuery } from "../../redux/services/manager/courses-student";

export const TeacherPanel = (): React.ReactElement => {
  const { user } = useAuthContext();
  const { query } = useRouter();
  const socket = useRef<Socket | undefined>();

  const getSocket = useCallback(() => {
    if (socket.current) {
      return socket.current;
    }
    socket.current = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/", auth: user ? { userId: user.id } : {} })
    return socket.current;
  }, [socket]);

  const assignmentList = useGetAssignmentListStudentQuery({ class_id: query.id as string })

  const courseIds = useMemo(() => {
    return assignmentList.data?.data.map((assignment) => assignment.courseid).filter((a, i, arr) => arr.indexOf(a) === i);
  }, [assignmentList.data]);

  const publicCourseContentQuery = useGetCourseContentListQuery({ ids: courseIds ?? [] }, { skip: !courseIds });

  const lessonIds = useMemo(() => {
    return publicCourseContentQuery.data?.map((courseContent) => courseContent.units.map((unit) => unit.lessons.map((lesson) => lesson.id))).flat(2).filter((a, i, arr) => arr.indexOf(a) === i);
  }, [publicCourseContentQuery.data]);

  useEffect(() => {
    if (lessonIds) {
      lessonIds.forEach((lessonId) => {
        getSocket().emit("joinLesson", lessonId);
      });

      return () => {
        lessonIds.forEach((lessonId) => {
          getSocket().emit("leaveLesson", lessonId);
        });
      }
    }
    return undefined;
  }, [lessonIds]);

  return (
    <SocketContext.Provider value={getSocket()}>
      <Stack>
        <TopBar />
        <Stack sx={{ position: "relative", height: "calc(100vh - 50px)" }}>
          <ResizerUi
            split="vertical"
            maxSize={-100}
            minSize={550}
            defaultSize={550}
          >
            <CodePanel />
            <QuickRabbits />
          </ResizerUi>
        </Stack>
      </Stack>
    </SocketContext.Provider>
  );
};
