import { type FC, useRef, useState } from 'react'

import { Stack } from '@mui/system'
import { FaDesktop } from '@react-icons/all-files/fa/FaDesktop'
import { TiDocumentText } from '@react-icons/all-files/ti/TiDocumentText'
import { useDispatch } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import type { AuthUserType } from '@/auth/types'
import useIsDesktop from '@/hooks/useIsDesktop'
import type { ILesson, ILessonContent } from '@/redux/interfaces/content.interface'
import { setCode, toggleBrowser, toggleInstrations } from '@/redux/slices/code-panel-global'
import { setTab } from '@/redux/slices/mobile-tab-manager'
import { useSelector } from '@/redux/store'
import { TAB_TITLES } from '@/sections/code-panel/body/consts'
import type { BaseResponseInterface } from '@/utils/baseResponse.interface'

import CodeEditorBlock from './blocks/code-editor-block'
import HidedTabBtn from './blocks/code-editor-block/elements/hided-tab-btn'
import SliderBlock from './blocks/slider-block'
import ViewBlock from './blocks/view-block'
import { CodeDocument } from './blocks/view-block/browser-view'
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

let previousLength: number | null = null
let checkValueTimeout: any | null = null

const CodePanelBody: FC<CodePanelBodyProps> = ({
  lesson,
  onSubmitChallenge,
  onSubmitLesson,
  lessonContents,
  user,
  isFetchingLessonContent = false,
  lastLessonCode,
}) => {
  const socket = useSelector((state) => state.codePanelGlobal.socket)
  const isDesktop = useIsDesktop()
  const dispatch = useDispatch()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  const slideIndex = useSelector((state) => state.codePanelGlobal.slideIndex)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)

  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  const [document, setDocument] = useState<CodeDocument | null>(null)

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
          />
        ) : (
          <HidedTabBtn
            title={TAB_TITLES.instructions}
            icon={<TiDocumentText size={20} />}
            openPanelFnc={openInstruction}
          />
        )}

        <CodeEditorBlock
          preloadedCode={(lastLessonCode ?? lessonContents[slideIndex]?.preload_body) || ''}
          validations={lessonContents[slideIndex]?.validations || ''}
          code={document?.htmlBody?.join('') ?? ''}
          user={user}
          onChangeStreamingDocInfo={onChangeStreamingDocInfo}
          isFetching={isFetchingLessonContent}
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

        <SidePanel
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
        isFetching={isFetchingLessonContent}
        code={document?.htmlBody?.join('') ?? ''}
      />

      <CodeEditorBlock
        code={document?.htmlBody?.join('') ?? ''}
        onChangeStreamingDocInfo={onChangeStreamingDocInfo}
        user={user}
        preloadedCode={lastLessonCode ?? lessonContents[slideIndex]?.preload_body}
        validations={lessonContents[slideIndex]?.validations}
        isFetching={isFetchingLessonContent}
      />

      <ViewBlock document={document} />
    </SwipeableViews>
  )
}

export default CodePanelBody
