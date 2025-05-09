import { useRef } from 'react'

import { Tooltip } from '@mui/material'
import { IoStatsChart } from '@react-icons/all-files/io5/IoStatsChart'
import { LuPenLine } from '@react-icons/all-files/lu/LuPenLine'
import { MdEmojiEmotions } from '@react-icons/all-files/md/MdEmojiEmotions'
import { MdImage } from '@react-icons/all-files/md/MdImage'
import { MdVideocam } from '@react-icons/all-files/md/MdVideocam'

import { EmojiSelector } from '@root/src/components/emoji-selector/EmojiSelectDialog'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import LessonStepMain from '@root/src/sections/dashboard/lessons/LessonStep/LessonStepMain'
import { ImageAttributes, MediaModal } from '@root/src/sections/dashboard/medias/MediaModal'

import { SaveEditContentStyles } from './SaveEditContentStyles'

export function SaveEditContent({ }: any) {
  const {
    value: advancedEditor,
    onTrue: advancedEditorOpen,
    onFalse: advancedEditorClose,
  } = useBoolean(false)
  const {
    value: emojiSelector,
    onTrue: emojiSelectorOpen,
    onFalse: emojiSelectorClose,
  } = useBoolean(false)
  const emojiSelectorAnchor = useRef(null)

  function pasteToIframe(content: any) {
    ; (
      document.querySelector('iframe.BrowserViewTeacherView') as HTMLIFrameElement
    )?.contentWindow?.postMessage(
      {
        type: 'simulatePaste',
        content: content,
      },
      '*'
    )
  }
  const handleEmojiSelect = (emoji: string) => pasteToIframe(emoji)

  const insertImage = (image: ImageAttributes) =>
    pasteToIframe(
      `<img src="${image.src}" style="max-width: 100%; height: auto;" alt="${image.alt}"/>`
    )
  const lessonManager = useLessonManager()
  if (!lessonManager.userIsOwner) return null

  return (
    <>
      <style> {SaveEditContentStyles} </style>
      <div className='SaveEditContent'>
        <div>
          <div>
            <div className='SECLeft'>
              <Tooltip title={'Advance Lesson Editor'}>
                <a onClick={advancedEditorOpen}>
                  <IoStatsChart size={20} />
                </a>
              </Tooltip>
              <div className='SECDiv'></div>
              <Tooltip title={'Add Image from Gallery'}>
                <a>
                  <MediaModal insertImage={insertImage}>
                    <MdImage size={24} />
                  </MediaModal>
                </a>
              </Tooltip>

              <Tooltip title={'You can paste video from youtube'}>
                <a href={`#`}>
                  <MdVideocam size={24} />
                </a>
              </Tooltip>

              <Tooltip title={'You will add Emoji'}>
                <a
                  onClick={emojiSelectorOpen}
                  ref={emojiSelectorAnchor}
                >
                  <MdEmojiEmotions size={24} />
                </a>
              </Tooltip>
              <div className='SECDiv'></div>
              {lessonManager.currentSlideUpdated ? (
                <a
                  onClick={lessonManager.saveSlideDB}
                  className='editableLink'
                >
                  <LuPenLine size={24} />
                  Save
                </a>
              ) : (
                <span className='editableText'>Editable</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {advancedEditor && <LessonStepMain closeThis={advancedEditorClose} />}

      {emojiSelector && (
        <EmojiSelector
          anchorEl={emojiSelectorAnchor.current}
          onEmojiSelect={handleEmojiSelect}
          open={emojiSelector}
          onClose={emojiSelectorClose}
        />
      )}
    </>
  )
}
