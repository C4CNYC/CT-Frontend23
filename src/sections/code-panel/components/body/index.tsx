import { type FC, memo, useContext, useState } from 'react'

import { Stack } from '@mui/system'
import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import Split from '@uiw/react-split'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import useIsDesktop from '@/hooks/useIsDesktop'
import { toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { TAB_TITLES } from '@/sections/code-panel/components/body/consts'
import { CodePanelBodyProps } from '@/sections/code-panel/components/body/types'

import { CodePanelContext } from '../../lib/CodePanelContext'

import CodeEditorBlock from './blocks/code-editor-block'
import HidedTabBtn from './blocks/code-editor-block/elements/hided-tab-btn'
import ResizeDivider from './blocks/resize-divider'
import SliderBlock from './blocks/slider-block'
import ViewBlock from './blocks/view-block'
import { CodeDocument } from './blocks/view-block/browser-view'

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  isLoadingLessonContent,
}) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const { autoRun } = useContext(CodePanelContext)

  const [document, setDocument] = useState<CodeDocument | null>()
  const [browserView, setBrowserView] = useState<CodeDocument | null>()

  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)
  const isCenterMode = isBrowserHidden && isInstructionsHidden

  const onChangeStreamingDocInfo = (doc: CodeDocument) => {
    try {
      setDocument(doc)
      if (autoRun && doc?.htmlBody) {
        setBrowserView(doc)
      }
    } catch (error: any) {}
  }

  const reloadBrowserView = () => {
    setBrowserView({ ...document })
  }

  const openInstruction = () => {
    dispatch(toggleInstrations(false))
  }

  const openPreview = () => {
    dispatch(toggleBrowser(false))
  }

  const getDisabled = () => {
    if (isCenterMode) return true
    return isInstructionsHidden ? [2] : isBrowserHidden ? [3] : false
  }

  const getVisible = () => {
    if (isCenterMode) return false
    return isInstructionsHidden ? [3] : isBrowserHidden ? [2] : true
  }

  if (isDesktop) {
    return (
      <Stack
        px={1}
        gap={1}
        direction='row'
        id='view_user_code_block'
      >
        <Split
          lineBar
          disable={getDisabled()}
          style={{
            borderRadius: 3,
            width: '100%',
          }}
          visible={getVisible()}
          renderBar={({ ...props }) => (
            <ResizeDivider
              props={props}
              isBrowserHidden={isCenterMode}
            />
          )}
        >
          <div
            style={{
              width:
                isCenterMode || isInstructionsHidden ? '34px' : isBrowserHidden ? '44%' : '28%',
              maxWidth: '40%',
              minWidth: !isInstructionsHidden ? '26%' : '34px',
            }}
          >
            {!isInstructionsHidden ? (
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
          </div>
          <div
            style={{
              width: isCenterMode ? '100%' : '56%',
              flex: 1,
            }}
          >
            <CodeEditorBlock
              preloadedCode={lessonContents[slideIndex]?.preload_body ?? ''}
              validations={lessonContents[slideIndex]?.validations || ''}
              onChangeStreamingDocInfo={onChangeStreamingDocInfo}
              contentId={lessonContents[slideIndex]?.id}
            />
          </div>
          <div
            style={{
              width:
                isCenterMode || isBrowserHidden ? '28px' : isInstructionsHidden ? '44%' : '26%',
              maxWidth: '40%',
              minWidth: !isBrowserHidden ? '20%' : '34px',
              paddingLeft: isBrowserHidden ? '5px' : 0,
            }}
          >
            {!isBrowserHidden ? (
              <ViewBlock
                integrations={lesson?.integrations ?? []}
                document={browserView!}
                reloadBrowserView={reloadBrowserView}
              />
            ) : (
              <HidedTabBtn
                title={TAB_TITLES.browser_preview}
                icon={<FaDesktop size={20} />}
                openPanelFnc={openPreview}
              />
            )}
          </div>
        </Split>
      </Stack>
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

      <CodeEditorBlock
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        preloadedCode={lessonContents[0]?.preload_body ?? ''}
        validations={lessonContents[slideIndex]?.validations || ''}
        contentId={lessonContents[slideIndex]?.id}
      />

      <ViewBlock
        document={document!}
        integrations={lesson?.integrations ?? []}
      />
    </SwipeableViews>
  )
}

export default CodePanelBody
