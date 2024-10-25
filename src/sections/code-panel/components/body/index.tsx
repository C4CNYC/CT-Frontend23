import { type FC, useRef, useState } from 'react'

import { Stack } from '@mui/system'
import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import useIsDesktop from '@/hooks/useIsDesktop'
import { setCode, toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { TAB_TITLES } from '@/sections/code-panel/components/body/consts'
import { CodePanelBodyProps } from '@/sections/code-panel/components/body/types'

import CodeEditorBlock from './blocks/code-editor-block'
import HidedTabBtn from './blocks/code-editor-block/elements/hided-tab-btn'
import NavPanel from './blocks/nav-panel'
import SliderBlock from './blocks/slider-block'
import ViewBlock from './blocks/view-block'
import { CodeDocument } from './blocks/view-block/browser-view'

let previousLength: number | null = null
let checkValueTimeout: any | null = null

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  user,
  language,
}) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [document, setDocument] = useState<CodeDocument | null>(null)
  const [browserView, setBrowserView] = useState<CodeDocument | null>(null)

  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    try {
      if (checkValueTimeout) {
        // Clear the previous timeout if the value changes
        clearTimeout(checkValueTimeout)
      }

      previousLength = doc?.htmlBody?.length // Store the current value
      if (lessonId && user) {
        socket?.emit('changeStatusInLesson', {
          lesson: lessonId,
          user: user?.id,
          status: 'active',
        })
      }

      // Set up the check for 30 seconds later
      checkValueTimeout = setTimeout(() => {
        if (doc?.htmlBody?.length === previousLength) {
          socket?.emit('changeStatusInLesson', {
            lesson: lessonId,
            user: user?.id,
            status: 'idle',
          })
        }
      }, 30000) // 30 seconds

      setDocument(doc as CodeDocument)
      dispatch(setCode((doc?.htmlBody as unknown as string[])?.join('') ?? doc ?? ''))
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error)
    }
  }

  const reloadBrowserView = () => {
    setBrowserView(document)
  }

  const openInstruction = () => {
    dispatch(toggleInstrations(false))
  }

  const openPreview = () => {
    dispatch(toggleBrowser(false))
  }

  if (isDesktop) {
    return (
      <Stack
        ref={wrapperRef}
        px={1}
        gap={1}
        direction='row'
        alignItems='stretch'
      >
        {!isInstructionsHidden ? (
          <SliderBlock
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
            data={lessonContents}
            integrations={lesson?.integrations ?? []}
            code={document?.htmlBody?.join('') ?? ''}
            lessonType={lesson?.type}
            lessonName={lesson?.name}
            lessonId={lesson?.id || lessonId}
          />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.instructions}
            icon={<TiDocumentText size={20} />}
            openPanelFnc={openInstruction}
          />
        )}

        <CodeEditorBlock
          preloadedCode={lessonContents[0]?.preload_body ?? ''}
          validations={lessonContents[slideIndex]?.validations || ''}
          code={document?.htmlBody?.join('') ?? ''}
          user={user}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          contentId={lessonContents[slideIndex]?.id}
        />

        {!isBrowserHidden ? (
          <ViewBlock
            integrations={lesson?.integrations ?? []}
            document={browserView}
            reloadBrowserView={reloadBrowserView}
          />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.browser_preview}
            icon={<FaDesktop size={20} />}
            openPanelFnc={openPreview}
          />
        )}

        <NavPanel
          wrapperListenerRef={wrapperRef}
          cursorName={user?.first_name}
          lessonId={lessonId}
        />
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
        data={lessonContents}
        integrations={lesson?.integrations ?? []}
        code={document?.htmlBody?.join('') ?? ''}
        lessonType={lesson?.type}
        lessonId={lesson?.id || lessonId}
      />

      <CodeEditorBlock
        code={document?.htmlBody?.join('') ?? ''}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
        preloadedCode={lessonContents[0]?.preload_body ?? ''}
        validations={lessonContents[slideIndex]?.validations}
      />

      <ViewBlock
        document={document}
        integrations={lesson?.integrations ?? []}
      />
    </SwipeableViews>
  )
}

export default CodePanelBody
