import dynamic from "next/dynamic";
import Head from "next/head";

import { FullScreen } from "react-full-screen";

import { Box } from "@mui/material";

import SkeletonCodePanel, {
  CPTopBarSkeleton,
} from "@sections/code-editor-panel/skeleton";
import WorkSpace from "@sections/code-editor-panel/work-space";
import { useCodePanel } from "src/hooks/useCodePanel";
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
  sx: { position: "relative", overflow: "hidden" },
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

  if (!isLoadingComplete) {
    return <SkeletonCodePanel />;
  }

  return (
    <Box>
      <Head>
        <title> CodePanel: CodeTribe </title>
      </Head>

      <FullScreen handle={handle}>
        <Tour />

        <SignUpDialog isSigned={!!workSpaceProps.user} />

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
  );
}
