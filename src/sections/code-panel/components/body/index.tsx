import { type FC, memo, useContext, useRef, useState } from 'react'

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
import NavPanel from './blocks/nav-panel'
import ResizeDivider from './blocks/resize-divider'
import SliderBlock from './blocks/slider-block'
import ViewBlock from './blocks/view-block'
import { CodeDocument } from './blocks/view-block/browser-view'

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  user,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

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

  const onChangeStreamingDocInfo = (doc: CodeDocument) => {
    try {
      setDocument(doc)

      if (autoRun) {
        setBrowserView(doc)
      }
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
      >
        {!isInstructionsHidden ? (
          <SliderBlock
            data={lessonContents}
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
        <Split
          lineBar
          disable={isBrowserHidden}
          style={{
            borderRadius: 3,
            flexBasis: isInstructionsHidden ? '100%' : '66.6%',
          }}
          renderBar={({ ...props }) => (
            <ResizeDivider
              props={props}
              isBrowserHidden={isBrowserHidden}
            />
          )}
        >
          <div
            style={{
              width: isInstructionsHidden || isBrowserHidden ? '100%' : '56%',
              minWidth: '49%',
              flex: 1,
            }}
          >
            <CodeEditorBlock
              preloadedCode={lessonContents[slideIndex]?.preload_body ?? ''}
              validations={lessonContents[slideIndex]?.validations || ''}
              code={document?.htmlBody ?? ''}
              user={user}
              onChangeStreamingDocInfo={onChangeStreamingDocInfo}
              contentId={lessonContents[slideIndex]?.id}
            />
          </div>
          <div
            style={{
              width: !isBrowserHidden ? '44%' : '0%',
              minWidth: isBrowserHidden ? 30 : '41%',
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
        lessonType={lesson?.type}
        lessonId={lesson?.id || lessonId}
      />

      <CodeEditorBlock
        code={document?.htmlBody ?? ''}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
        preloadedCode={lessonContents[0]?.preload_body ?? ''}
        validations={lessonContents[slideIndex]?.validations}
      />

      <ViewBlock
        document={document!}
        integrations={lesson?.integrations ?? []}
      />
    </SwipeableViews>
  )
}

export default memo(CodePanelBody)
