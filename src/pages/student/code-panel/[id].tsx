import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FullScreen } from "react-full-screen";
import { Socket, io } from "socket.io-client";

import { Box, Theme, useTheme } from "@mui/material";

import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-editor-panel/skeleton";
import WorkSpace from "@sections/code-editor-panel/work-space";
import { useCodePanel } from "src/hooks/useCodePanel";

import { useAuthContext } from "../../../auth/useAuthContext";
import { SocketContext } from "../../../context/socket-context";
import { LessonUserContext } from "../../../context/lesson-context";
import SignUpDialog from "./sign-up-dialog";
import { ILessonUserStatus } from "@types";

type LessonUserResponseType = {
  id: string;
  status: string;
}

const Tour = dynamic(
  async () => await import("@sections/code-editor-panel/code-panel-tour"),
  { ssr: false }
);

const TopPanel = dynamic(
  async () => await import("@sections/code-editor-panel/top-bar"),
  { loading: () => <CPTopBarSkeleton /> }
);

const Confetti = dynamic(async () => await import("react-confetti"));

const ChatPopup = dynamic(
  async () =>
    await import(
      "@sections/code-editor-panel/top-bar/nav-bar/options/chat-popup"
    )
);

const BottomBar = dynamic(
  async () => await import("@sections/code-editor-panel/bottom-bar")
);

const LessonsManager = dynamic(
  async () =>
    await import("@sections/code-editor-panel/bottom-bar/lesson-manager")
);

const CONFETI_GRAVITY = 0.25;
const MAX_NUMBER_OF_PIECES = 500;
const MIN_NUMBER_OF_PIECES = 0;
const getBoxProps = (theme: Theme) => ({
  bgcolor:
    theme.palette.mode === "light" ? "white" : theme.palette.background.neutral,
  position: "relative",
  overflow: "hidden",
});

export default function Index(): React.ReactElement | null {
  const {
    handle,
    isLoadingComplete,
    confetti,
    onConfettiComplete,
    workSpaceProps,
    bottomBarProps,
    isDesktop,
    lessonManagerProps,
  } = useCodePanel();

  const theme = useTheme();
  const boxProps = useMemo(() => getBoxProps(theme), [theme]);
  const { user } = useAuthContext();
  const [usersStatus, setUsersStatus] = useState<ILessonUserStatus[]>([]);

  const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
    path: "/api/",
    auth: user ? { userId: user.id } : {},
  });
  socket.on('connect_error', (error) => {
    console.error('Connection error', error);
  });
  const router = useRouter();
  const lessonId = router.query.lessonId;

  // const getSocket = useCallback(() => {
  //   if (socket.current) {
  //     return socket.current;
  //   }
  //   socket.current = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
  //     path: "/api/",
  //     auth: user ? { userId: user.id } : {},
  //   });
  //   console.log(socket.current)
  //   return socket.current;
  // }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server', lessonId);

      if (lessonId) {
        console.log('joinNewLesson', JSON.stringify({ lesson: lessonId, userId: user?.id }));

        socket.emit("joinLesson", JSON.stringify({ lesson: lessonId }));
      }
    });

    return () => {
      socket.off("joinLesson");
      socket.off("leaveLesson");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (router.query.lessonId) {
      socket.emit("joinLesson", JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id }));

      socket.on("joinLesson_", (data: { lesson: string, user: string }) => {
        const { lesson, user } = data;
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus.filter(_status => _status.id !== user), { id: user, status: 'idle' }])
      });
      socket.on("changeStatusInLesson_", (data: { user: string, status: string }) => {
        const { status, user } = data;
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus.filter(_status => _status.id !== user), { id: user, status: status }])
      });

      socket.on("lessonMembers", (data: { participants: LessonUserResponseType[] }) => {
        const { participants } = data;
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, ...participants])
      });
      socket.on("leaveLesson_", (data: { lesson: string, user: string }) => {
        const { lesson, user } = data;
        setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus.filter(_status => _status.id !== user), { id: user, status: 'inactive' }]);
      });

      socket.onAnyOutgoing((e) => {
        console.log("out:", e);
      });

      socket.onAny((e) => {
        console.log("in:", e);
      });
      return () => {
        socket.off('joinLesson_');
        socket.off('changeStatusInLesson_');
        socket.off('lessonMembers');
        // socket.off('leaveLesson_')
        socket.emit("leaveLesson", JSON.stringify({ lesson: router.query.lessonId, user: user?.student_profile?.id }));
      };
    }
    return undefined;
  }, [router.query.lessonId]);

  // useEffect(() => {
  //   socket.on("joinLesson_", (data: any) => {
  //     console.log("joinLesson response");
  //     const { lesson, user } = data;
  //     console.log({ lesson, user });
  //     setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, { id: user, status: 'idle' }])
  //   });
  //   socket.on("leaveLesson_", (data: any) => {
  //     console.log("leaveLesson response");
  //     const { lesson, user } = data;
  //     console.log({ lesson, user });
  //     // setUsersStatus((_usersStatus: ILessonUserStatus[]) => [..._usersStatus, { id: user, status: 'idle' }])
  //   });
  //   return () => {
  //     socket.off('joinLesson_')
  //     socket.off('leaveLesson_')
  //   }
  // }, [])

  // useEffect(() => {
  //   if (router.query.lessonId && socket.current) {

  //     socket.current.emit("joinLesson", router.query.lessonId);

  //     return () => {
  //       socket.current?.emit("leaveLesson", router.query.lessonId);
  //     };
  //   }
  //   return undefined;
  // }, [router.query.lessonId]);

  // useEffect(() => {
  //   if (user && socket.current) {

  //     socket.current.emit("joinRoom", user.student_profile.id);
  //     return () => {
  //       socket.current?.emit("leaveRoom", user.student_profile.id);
  //     };
  //   }
  //   return undefined;
  // }, [user]);

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />;
  }

  return (
    <SocketContext.Provider value={socket}>
      <LessonUserContext.Provider value={usersStatus}>
        <Box>
          <Head>
            <title> CodePanel: CodeTribe </title>
          </Head>

          <FullScreen handle={handle}>
            <Tour />

            <SignUpDialog isSigned={!!workSpaceProps.user} />

            <Box sx={boxProps}>
              <TopPanel
                chatComponent={null}
                onHanldeFullScreen={handle.active ? handle.exit : handle.enter}
                isFullScreenView={handle.active}
              />

              <WorkSpace {...workSpaceProps} />

              <BottomBar
                {...bottomBarProps}
                lessonManagerComponent={
                  <LessonsManager {...lessonManagerProps} />
                }
              />
            </Box>

            {!isDesktop ? <ChatPopup chatComponent={null} /> : null}
          </FullScreen>

          <Confetti
            numberOfPieces={
              confetti ? MAX_NUMBER_OF_PIECES : MIN_NUMBER_OF_PIECES
            }
            recycle={false}
            gravity={CONFETI_GRAVITY}
            onConfettiComplete={onConfettiComplete}
          />
        </Box>
      </LessonUserContext.Provider>
    </SocketContext.Provider>
  );
}
