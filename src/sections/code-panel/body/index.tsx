import { type FC, useRef } from 'react'

import { Stack } from '@mui/system'
import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import type { AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import type { ILesson, ILessonContent } from '@/redux/interfaces/content.interface'
import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { TAB_TITLES } from '@/sections/code-panel/body/consts'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'

import CodeEditorBlock from './blocks/code-editor-block'
import HidedTabBtn from './blocks/code-editor-block/elements/hided-tab-btn'
import SliderBlock from './blocks/slider-block'
import ViewBlock from './blocks/view-block'
import SidePanel from './side-panel'

interface CodePanelBodyProps {
  isFetchingLessonContent?: boolean
  lesson?: ILesson & BaseResponseInterface
  lessonContents: Array<ILessonContent & BaseResponseInterface>
  user: AuthUserType
  onSubmitChallenge: (lessonContentId: string) => Promise<void>
  onSubmitLesson: () => Promise<void>
  lastLessonCode?: string
}

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  user,
  isFetchingLessonContent = false,
  lastLessonCode,
}) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const document = useSelector((state) => state.codePanelGlobal.document)
  const code = useSelector((state) => state.codePanelGlobal.code)

  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const openInstruction = () => {
    dispatch(toggleInstrations(false))
  }

  const openPreview = () => {
    dispatch(toggleBrowser(false))
  }

  const contents = (
    <>
      {!isInstructionsHidden || !isDesktop ? (
        <SliderBlock
          onSubmitLesson={onSubmitLesson}
          onSubmitChallenge={onSubmitChallenge}
          data={lessonContents}
          integrations={lesson?.integrations ?? []}
          isFetching={isFetchingLessonContent}
          code={code}
        />
      ) : (
        <HidedTabBtn
          title={TAB_TITLES.instructions}
          icon={<TiDocumentText size={20} />}
          openPanelFnc={openInstruction}
        />
      )}

      <CodeEditorBlock
        code={code}
        preloadedCode={lastLessonCode ?? lessonContents[slideIndex]?.preload_body}
        validations={lessonContents[slideIndex]?.validations}
        user={user}
        isFetching={isFetchingLessonContent}
      />

      {!isBrowserHidden || !isDesktop ? (
        <ViewBlock document={document} />
      ) : (
        <HidedTabBtn
          title={TAB_TITLES.browser_preview}
          icon={<FaDesktop size={20} />}
          openPanelFnc={openPreview}
        />
      )}

      {isDesktop && (
        <SidePanel
          wrapperListenerRef={wrapperRef}
          cursorName={user?.first_name}
          lessonId={lessonId}
        />
      )}
    </>
  )

  return isDesktop ? (
    <Stack
      ref={wrapperRef}
      px={1}
      gap={1}
      direction='row'
      alignItems='stretch'
    >
      {contents}
    </Stack>
  ) : (
    <SwipeableViews
      index={activeTab}
      onChangeIndex={(index) => {
        dispatch(setTab(index))
      }}
    >
      {contents}
    </SwipeableViews>
  )
}

export default CodePanelBody
