import { type FC, useRef, useState } from 'react'

import { Stack } from '@mui/system'
import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views-react-18-fix'

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

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  user,
  isFetchingLessonContent = false,
}) => {
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [document, setDocument] = useState<CodeDocument | null>(null)

  const isDesktop = useIsDesktop()

  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const onChangeStreamingDocInfo = (doc: Record<string, string>) => {
    try {
      setDocument(doc as CodeDocument)
      dispatch(setCode((doc?.htmlBody as unknown as string[])?.join('') ?? ''))
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error)
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
            isFetching={isFetchingLessonContent}
            code={document?.htmlBody?.join('') ?? ''}
            lessonType={lesson?.type}
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
          isFetching={isFetchingLessonContent}
          contentId={lessonContents[slideIndex]?.id}
        />

        {!isBrowserHidden ? (
          <ViewBlock document={document} />
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
      onChangeIndex={(index: number) => {
        dispatch(setTab(index))
      }}
    >
      <SliderBlock
        onSubmitLesson={onSubmitLesson}
        onSubmitChallenge={onSubmitChallenge}
        data={lessonContents}
        integrations={lesson?.integrations ?? []}
        isFetching={isFetchingLessonContent}
        code={document?.htmlBody?.join('') ?? ''}
        lessonType={lesson?.type}
      />

      <CodeEditorBlock
        code={document?.htmlBody?.join('') ?? ''}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
        preloadedCode={lessonContents[0]?.preload_body ?? ''}
        validations={lessonContents[slideIndex]?.validations}
        isFetching={isFetchingLessonContent}
      />

      <ViewBlock document={document} />
    </SwipeableViews>
  )
}

export default CodePanelBody
