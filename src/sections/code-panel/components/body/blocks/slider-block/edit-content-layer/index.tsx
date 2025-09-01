import { useRef, useEffect } from 'react'

import { Tooltip, Box, Button } from '@mui/material'
import { BiLinkExternal } from '@react-icons/all-files/bi/BiLinkExternal'
import { FaPen } from '@react-icons/all-files/fa/FaPen'
import { LuSave } from '@react-icons/all-files/lu/LuSave'
import { MdClose } from '@react-icons/all-files/md/MdClose'

import { useSnackbar } from '@/components'
import { EmojiSelector } from '@root/src/components/emoji-selector/EmojiSelectDialog'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import LessonStepMain from '@root/src/sections/dashboard/lessons/LessonStep/LessonStepMain'
import { MediaInsertModal } from '@root/src/sections/dashboard/medias/MediaInsertModal'
import { YouTubeInsertModal } from '@root/src/sections/dashboard/medias/YouTubeInsertModal'

import AdaptivePopup from '../adaptive-popup'
import { ModalAskToSave } from '../modal-ask-to-save'
import { handleEmojiSelect, handleInsertImage, handleInsertVideo } from '../utils'

import { TOP_BAR_STYLES, ICON_BUTTON_STYLES } from './styles'

export function EditContentLayer({
  isEditLesson,
  setIsEditLesson,
  isOpenModalCurrentSlideEdited,
  setIsOpenModalCurrentSlideEdited,
}: any) {
  const { enqueueSnackbar } = useSnackbar()

  const {
    value: isOpenAdvancedEditor,
    onTrue: handleOpenAdvancedEditor,
    onFalse: handleCloseAdvancedEditor,
  } = useBoolean(false)
  const {
    value: isOpenEmojiSelector,
    onTrue: handleOpenEmojiSelector,
    onFalse: handleCloseEmojiSelector,
  } = useBoolean(false)
  const {
    value: isOpenYoutubeInsertModal,
    onTrue: handleOpenYoutubeInsertModal,
    onFalse: handleCloseYoutubeInsertModal,
  } = useBoolean(false)
  const {
    value: isOpenMediaInsertModal,
    onTrue: handleOpenMediaInsertModal,
    onFalse: handleCloseMediaInsertModal,
  } = useBoolean(false)

  const emojiSelectorRef = useRef<HTMLDivElement | null>(null)
  const editableDivRef = useRef<HTMLDivElement | null>(null)
  const iframeSliderRef = useRef<HTMLIFrameElement | null>(null)

  const lessonManager = useLessonManager()

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector(
        'iframe.BrowserViewTeacherView'
      ) as HTMLIFrameElement | null

      if (iframe && iframe.contentDocument) {
        iframeSliderRef.current = iframe

        const editableDiv = iframe.contentDocument.getElementById(
          'VeryEditableDivId'
        ) as HTMLDivElement | null

        if (editableDiv) {
          editableDivRef.current = editableDiv
          observer.disconnect()
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  if (!lessonManager.userIsOwner) return null

  const handleEditToggle = (value: boolean) => {
    if (lessonManager.currentSlideUpdated) {
      lessonManager.saveSlideDB()
      return
    }

    if (editableDivRef.current) {
      setIsEditLesson((prev: any) => !prev)
      editableDivRef.current.setAttribute('contentEditable', value ? 'true' : 'false')
    } else {
      enqueueSnackbar('Editable area not found, pleease go to main editor', { variant: 'error' })
    }
  }

  const handleSaveEdited = () => {
    if (lessonManager.currentSlideUpdated) {
      lessonManager.saveSlideDB()
    }

    if (editableDivRef.current) {
      setIsEditLesson(false)
      editableDivRef.current.setAttribute('contentEditable', 'false')
      setIsOpenModalCurrentSlideEdited(false)
    } else {
      enqueueSnackbar('Editable area not found, pleease go to main editor', { variant: 'error' })
    }
  }

  return (
    <>
      <Box sx={TOP_BAR_STYLES}>
        <Tooltip
          title={'You created this lesson or have editing rights to edit slides and exercise code.'}
        >
          <Button
            sx={ICON_BUTTON_STYLES}
            className={`${isEditLesson ? 'active' : ''}`}
            onClick={() => handleEditToggle(!isEditLesson)}
          >
            {lessonManager.currentSlideUpdated ? (
              <LuSave size={20} />
            ) : (
              <>{isEditLesson ? <MdClose size={20} /> : <FaPen size={13} />}</>
            )}
          </Button>
        </Tooltip>
        <Tooltip title={'Go to Editor'}>
          <Button
            onClick={handleOpenAdvancedEditor}
            sx={ICON_BUTTON_STYLES}
          >
            <BiLinkExternal size={20} />
          </Button>
        </Tooltip>
      </Box>

      {isEditLesson && (
        <AdaptivePopup
          isEditMode={isEditLesson}
          emojiSelectorRef={emojiSelectorRef}
          editableDivRef={editableDivRef}
          iframeSliderRef={iframeSliderRef}
          handleOpenEmojiSelector={handleOpenEmojiSelector}
          handleOpenMediaInsertModal={handleOpenMediaInsertModal}
          handleOpenYoutubeInsertModal={handleOpenYoutubeInsertModal}
        />
      )}

      {isOpenAdvancedEditor && <LessonStepMain closeThis={handleCloseAdvancedEditor} />}

      {isOpenMediaInsertModal && (
        <MediaInsertModal
          insertImage={handleInsertImage}
          isOpen={isOpenMediaInsertModal}
          setIsOpen={handleCloseMediaInsertModal}
        />
      )}

      {isOpenYoutubeInsertModal && (
        <YouTubeInsertModal
          insertVideo={handleInsertVideo}
          isOpen={isOpenYoutubeInsertModal}
          setIsOpen={handleCloseYoutubeInsertModal}
        />
      )}
      {isOpenEmojiSelector && (
        <EmojiSelector
          anchorEl={emojiSelectorRef.current}
          onEmojiSelect={handleEmojiSelect}
          open={isOpenEmojiSelector}
          onClose={handleCloseEmojiSelector}
        />
      )}
      {isOpenModalCurrentSlideEdited && (
        <ModalAskToSave
          isOpen={isOpenModalCurrentSlideEdited}
          setIsOpen={setIsOpenModalCurrentSlideEdited}
          handleSaveEdited={handleSaveEdited}
        />
      )}
    </>
  )
}
