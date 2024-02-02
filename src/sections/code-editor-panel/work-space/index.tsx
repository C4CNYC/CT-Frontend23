import { type FC, useRef, useState } from "react"

import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Stack, type StackProps } from "@mui/system"
import { FaDesktop } from "@react-icons/all-files/fa/FaDesktop"
import { TiDocumentText } from "@react-icons/all-files/ti/TiDocumentText"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import SwipeableViews from "react-swipeable-views"

import { useSocket } from "@hooks"
import { TAB_TITLES } from "@sections/code-editor-panel/work-space/TAB_TITLES"
import { WorkSpaceProps } from "@sections/code-editor-panel/work-space/types"
import { setCode, toggleBrowser, toggleInstrations } from "src/redux/slices/code-panel-global"
import { setTab } from "src/redux/slices/mobile-tab-manager"
import { useSelector } from "src/redux/store"

import CodeEditorBlock from "./blocks/code-editor-block"
import HidedTabBtn from "./blocks/code-editor-block/hided-tab-btn"
import NavPanel from "./blocks/nav-panel"
import SliderBlock from "./blocks/slider-block"
import ViewBlock from "./blocks/view-block"
import { CodeDocument } from "./blocks/view-block/browser-view"

let previousLength: number | null = null
let checkValueTimeout: any | null = null

const WorkSpace: FC<WorkSpaceProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  data,
  user,
  language,
  isFetching = false,
  lastLessonCode,
}) => {
  const theme = useTheme()
  const socket = useSocket()
  const router = useRouter()
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000))
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)

  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)

  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const [document, setDocument] = useState<CodeDocument | null>(null)

  const onChangeCode = (doc: Record<string, string>) => {
    try {
      if (checkValueTimeout) {
        // Clear the previous timeout if the value changes
        clearTimeout(checkValueTimeout)
      }

      previousLength = doc?.htmlBody?.length // Store the current value
      if (router.query.lessonId && user) {
        socket?.emit("changeStatusInLesson", {
          lesson: router.query.lessonId,
          user: user?.id,
          status: "active",
        })
      }

      // Set up the check for 30 seconds later
      checkValueTimeout = setTimeout(() => {
        if (doc?.htmlBody?.length === previousLength) {
          socket?.emit("changeStatusInLesson", {
            lesson: router.query.lessonId,
            user: user?.id,
            status: "idle",
          })
        }
      }, 30000) // 30 seconds

      setDocument(doc as CodeDocument)
      dispatch(setCode((doc?.htmlBody as unknown as string[])?.join("") ?? ""))
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log("Error: ", error)
    }
  }

  const openInstruction = () => {
    dispatch(toggleInstrations(false))
  }

  const openPreview = () => {
    dispatch(toggleBrowser(false))
  }

  if (isDesktop) {
    return (
      <Stack ref={wrapperRef} {...STACK_PROPS}>
        {!isInstructionsHidden ? (
          <SliderBlock
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
            data={data}
            integrations={lesson?.integrations ?? []}
            isFetching={isFetching}
            code={document?.htmlBody?.join("") ?? ""}
          />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.instructions}
            icon={<TiDocumentText size={20} />}
            openPanelFnc={openInstruction}
          />
        )}

        <CodeEditorBlock
          preloadedCode={(lastLessonCode ?? data[slideIndex]?.preload_body) || ""}
          validations={data[slideIndex]?.validations || ""}
          code={document?.htmlBody?.join("") ?? ""}
          user={user}
          onChangeCode={onChangeCode}
        />

        {!isBrowserHidden ? (
          <ViewBlock code={document} />
        ) : (
          <HidedTabBtn title={TAB_TITLES.browser_preview} icon={<FaDesktop size={20} />} openPanelFnc={openPreview} />
        )}

        <NavPanel wrapperListenerRef={wrapperRef} cursorName={user?.first_name} />
      </Stack>
    )
  }

  return (
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index) => {
        dispatch(setTab(index))
      }}
    >
      <SliderBlock
        onSubmitLesson={onSubmitLesson}
        onSubmitChallenge={onSubmitChallenge}
        data={data}
        integrations={lesson?.integrations ?? []}
        isFetching={isFetching}
        code={document?.htmlBody?.join("") ?? ""}
      />

      <CodeEditorBlock
        code={document?.htmlBody?.join("") ?? ""}
        onChangeCode={onChangeCode}
        user={user}
        preloadedCode={lastLessonCode ?? data[slideIndex]?.preload_body}
        validations={data[slideIndex]?.validations}
      />

      <ViewBlock {...{ code: document, language }} />
    </SwipeableViews>
  )
}

const STACK_PROPS: StackProps = {
  px: 1,
  gap: 1,
  display: "flex",
  direction: "row",
  alignItems: "stretch",
}

export default WorkSpace
