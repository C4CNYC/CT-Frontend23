import dynamic from "next/dynamic";
import Head from "next/head";
import { FullScreen } from "react-full-screen";

import { Box } from "@mui/material";

import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-editor-panel/skeleton";
import WorkSpace from "@sections/code-editor-panel/work-space";

import { useCodePanel } from "src/hooks/useCodePanel";
import { SocketContext } from "../../../context/socket-context";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../auth/useAuthContext";

const Tour = dynamic(
  async () =>
    await import("@sections/code-editor-panel/code-panel-tour"),
  { ssr: false }
);

const TopPanel = dynamic(
  async () => await import("@sections/code-editor-panel/top-bar"),
  { loading: () => <CPTopBarSkeleton /> }
);

const Confetti = dynamic(async () => await import("react-confetti"));

const ChatPopup = dynamic(
  async () =>
    await import("@sections/code-editor-panel/top-bar/nav-bar/options/chat-popup")
);

const BottomBar = dynamic(
  async () => await import("@sections/code-editor-panel/bottom-bar")
);

const LessonsManager = dynamic(async () => await import("@sections/code-editor-panel/bottom-bar/lesson-manager"));

const CONFETI_GRAVITY = 0.25;
const MAX_NUMBER_OF_PIECES = 500;
const MIN_NUMBER_OF_PIECES = 0;
const BOX_PROPS = {
  bgcolor: "white",
  sx: { position: "relative", overflow: "hidden" }
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
    lessonManagerProps
  } = useCodePanel();

  const { user } = useAuthContext();

  const router = useRouter();

  const socket = useRef<Socket | undefined>();

  const getSocket = useCallback(() => {
    if (socket.current) {
      return socket.current;
    }
    socket.current = io(process.env.NEXT_PUBLIC_CODE_STREAM_API ?? "", { path: "/", auth: user ? { userId: user.id } : {} })
    return socket.current;
  }, [socket]);

  useEffect(() => {
    if (router.query.lessonId) {
      getSocket().emit("joinLesson", router.query.lessonId);

      return () => {
        getSocket().emit("leaveLesson", router.query.lessonId);
      }
    }
    return undefined;
  }, [router.query.lessonId]);

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

        <Box {...BOX_PROPS}>
          <TopPanel
            chatComponent={null}
            onHanldeFullScreen={handle.active ? handle.exit : handle.enter}
            isFullScreenView={handle.active}
          />

          <WorkSpace {...workSpaceProps} />

          <BottomBar
            {...bottomBarProps}
            lessonManagerComponent={<LessonsManager {...lessonManagerProps} />}
          />
        </Box>

        {!isDesktop ? <ChatPopup chatComponent={null} /> : null}
      </FullScreen>

      <Confetti
        numberOfPieces={confetti ? MAX_NUMBER_OF_PIECES : MIN_NUMBER_OF_PIECES}
        recycle={false}
        gravity={CONFETI_GRAVITY}
        onConfettiComplete={onConfettiComplete}
      />
    </Box>
    </SocketContext.Provider>
  );
}
