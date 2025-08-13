import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import useIsDesktop from '@/hooks/useIsDesktop'
import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { TAB_TITLES } from '@/sections/code-panel/components/body/consts'
import { CodePanelBodyProps } from '@/sections/code-panel/components/body/types'

import { CodeEditorBlockContent } from './blocks/code-editor-block/code-editor-block-content'
import HidedTabBtn from './blocks/code-editor-block/elements/hided-tab-btn'
import SliderBlock from './blocks/slider-block'
import { ViewBlock } from './blocks/view-block'
import { CodePanelBodyDesktop } from './CodePanelBodyDesktop'

export function CodePanelBody({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  isLoadingLessonContent,
}: CodePanelBodyProps) {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()

  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const openInstruction = () => dispatch(toggleInstrations(false))
  const openPreview = () => dispatch(toggleBrowser(false))


  if (isDesktop) {
    return (
      <CodePanelBodyDesktop
        left={!isInstructionsHidden ? (
          <SliderBlock
            isLoadingLessonContent={isLoadingLessonContent}
            onSubmitChallenge={onSubmitChallenge}
            onSubmitLesson={onSubmitLesson}
            integrations={lesson?.integrations ?? []}
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
        center=<CodeEditorBlockContent
          preloadedCode={lessonContents[slideIndex]?.preload_body ?? ''}
          contentId={lessonContents[slideIndex]?.id}
        />
        right={!isBrowserHidden ? (
          <ViewBlock />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.browser_preview}
            icon={<FaDesktop size={20} />}
            openPanelFnc={openPreview}
          />
        )}
      />
    )
  }

  return (
    <SwipeableViews
      disabled
      index={activeTab}
      onChangeIndex={(index) => {
        dispatch(setTab(index))
      }}
    >
      <SliderBlock
        isLoadingLessonContent={isLoadingLessonContent}
        onSubmitLesson={onSubmitLesson}
        onSubmitChallenge={onSubmitChallenge}
        integrations={lesson?.integrations ?? []}
        lessonType={lesson?.type}
        lessonId={lesson?.id || lessonId}
      />

      <CodeEditorBlockContent
        preloadedCode={lessonContents[0]?.preload_body ?? ''}
        contentId={lessonContents[slideIndex]?.id}
      />

      <ViewBlock />
    </SwipeableViews>
  )
}

export default CodePanelBody
