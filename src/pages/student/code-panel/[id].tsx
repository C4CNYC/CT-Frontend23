import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

import { FullScreen } from "react-full-screen";
import { Socket, io } from "socket.io-client";

import { Box } from "@mui/material";

import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-editor-panel/skeleton";
import WorkSpace from "@sections/code-editor-panel/work-space";
import { useCodePanel } from "src/hooks/useCodePanel";

import { useAuthContext } from "../../../auth/useAuthContext";
import { SocketContext } from "../../../context/socket-context";
import SignUpDialog from "./sign-up-dialog";

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
const BOX_PROPS = {
  position: "relative",
  overflow: "hidden",
};

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

  const { user } = useAuthContext();

  const router = useRouter();

  const socket = useRef<Socket | undefined>();

  const getSocket = useCallback(() => {
    if (socket.current) {
      return socket.current;
    }
    socket.current = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", {
      path: "/api/",
      auth: user ? { userId: user.id } : {},
    });
    return socket.current;
  }, [socket]);

  useEffect(() => {
    if (router.query.lessonId) {
      getSocket().emit("joinLesson", router.query.lessonId);

      return () => {
        getSocket().emit("leaveLesson", router.query.lessonId);
      };
    }
    return undefined;
  }, [router.query.lessonId]);

  useEffect(() => {
    if (user) {
      getSocket().emit("joinRoom", user.student_profile.id);
      return () => {
        getSocket().emit("leaveRoom", user.student_profile.id);
      };
    }
    return undefined;
  }, [user]);

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />;
  }

  return (
    <SocketContext.Provider value={getSocket()}>
      <Box>
        <Head>
          <title> CodePanel: CodeTribe </title>
        </Head>

        <FullScreen handle={handle}>
          <Tour />

          <SignUpDialog isSigned={!!workSpaceProps.user} />

          <Box sx={BOX_PROPS}>
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
    </SocketContext.Provider>
  );
}
