import { useRef, useState, useEffect } from 'react'

import { Tooltip } from '@mui/material'
import { LuSave } from '@react-icons/all-files/lu/LuSave'

import { EmojiSelector } from '@root/src/components/emoji-selector/EmojiSelectDialog'
import { useBoolean } from '@root/src/hooks/use-boolean'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import LessonStepMain from '@root/src/sections/dashboard/lessons/LessonStep/LessonStepMain'
import { ImageAttributes, MediaModal } from '@root/src/sections/dashboard/medias/MediaModal'
import { YouTubeInsertModal } from '@root/src/sections/dashboard/medias/YouTubeInsertModal'

import { SaveEditContentStyles } from './SaveEditContentStyles'

export function SaveEditContent({ isEditLesson, setIsEditLesson }: any) {
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
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const cursorPositionRef = useRef(null)

  function pasteToIframe(content: any) {
    let iFrame = document.querySelector('iframe.BrowserViewTeacherView') as
      | HTMLIFrameElement
      | undefined
    iFrame?.contentWindow?.postMessage({ type: 'simulatePaste', content: content }, '*')
  }
  const handleEmojiSelect = (emoji: string) => pasteToIframe(emoji)

  const insertImage = (image: ImageAttributes) =>
    pasteToIframe(
      `<img src="${image.src}" style="max-width: 100%; height: auto;" alt="${image.alt}"/>`
    )
  const handleInsertVideo = (url: string) => {
    pasteToIframe(url)
  }
  const lessonManager = useLessonManager()

  const saveCursorPosition = () => {
    const selection = window.getSelection()
    if ((selection?.rangeCount ?? 0) > 0) {
      cursorPositionRef.current = selection.getRangeAt(0).cloneRange()
    }
  }

  const handleKeyDown = (e: any) => {
    if (!isEditLesson) return

    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
      setShowContextMenu(false)
    }

    saveCursorPosition()
  }

  const handleContentClick = (e: any) => {
    if (!isEditLesson) return
    const iframe = document.querySelector('iframe.BrowserViewTeacherView') as
      | HTMLIFrameElement
      | undefined
    const editableDiv = iframe?.contentDocument?.getElementById('VeryEditableDivId')

    console.log('Editable div clicked', editableDiv)
    saveCursorPosition()

    setTimeout(() => {
      const rect = editableDiv?.getBoundingClientRect()
      const x = e.clientX - (rect?.left || 0)
      const y = e.clientY - (rect?.top || 0)

      setContextMenuPosition({ x, y })
      setShowContextMenu(true)
    }, 100)
  }

  const handleContentFocus = () => {
    if (!isEditLesson) return
    saveCursorPosition()

    setTimeout(() => {
      if (!isTyping) {
        setShowContextMenu(true)
      }
    }, 300)
  }

  useEffect(() => {
    if (!isEditLesson) return

    const iframe = document.querySelector('iframe.BrowserViewTeacherView') as
      | HTMLIFrameElement
      | undefined

    if (!iframe) return

    const onIframeLoad = () => {
      const editableDiv = iframe.contentDocument?.getElementById('VeryEditableDivId')
      console.log('editableDiv', editableDiv)

      if (editableDiv) {
        editableDiv.addEventListener('click', (e) => {
          handleContentClick(e)
          console.log('Iframe div clicked')
          window.parent.postMessage({ type: 'iframeClick' }, '*')
        })

        editableDiv.addEventListener('focus', (e) => {
          handleContentFocus(e)
          console.log('Iframe div focused')
          window.parent.postMessage({ type: 'iframeFocus' }, '*')
        })

        editableDiv.addEventListener('keydown', (e) => {
          handleKeyDown(e)
          console.log('Key pressed inside iframe:', e.key)
          window.parent.postMessage({ type: 'iframeKeyDown', key: e.key }, '*')
        })
      }
    }

    if (iframe.contentDocument?.readyState === 'complete') {
      onIframeLoad()
    }

    iframe.addEventListener('load', onIframeLoad)

    // }
    return () => iframe?.removeEventListener('load', onIframeLoad)
  }, [isEditLesson])

  if (!lessonManager.userIsOwner) return null

  const handleEditToggle = (value: boolean) => {
    setShowContextMenu(false)

    if (lessonManager.currentSlideUpdated) {
      lessonManager.saveSlideDB()
      return
    }

    setIsEditLesson((prev: any) => !prev)

    console.log('isEditLesson', value)
    const iframe = document.querySelector('iframe.BrowserViewTeacherView') as
      | HTMLIFrameElement
      | undefined
    const editableDiv = iframe?.contentDocument?.getElementById('VeryEditableDivId')

    if (editableDiv) {
      // editableDiv.contentEditable = isEditLesson ? 'true' : 'false'
      editableDiv.setAttribute('contentEditable', value ? 'true' : 'false')
    }
  }
  const isTyping = false // This should be derived from your application state

  const menuWidth = 200
  const menuHeight = 150

  const left =
    contextMenuPosition.x + menuWidth > window.innerWidth
      ? window.innerWidth - menuWidth - 10
      : contextMenuPosition.x

  const top =
    contextMenuPosition.y + menuHeight > window.innerHeight
      ? window.innerHeight - menuHeight - 10
      : contextMenuPosition.y

  return (
    <>
      <style> {SaveEditContentStyles} </style>
      <div className='top-bar'>
        <button
          onClick={() => handleEditToggle(!isEditLesson)}
          className={`icon-button ${isEditLesson ? 'active' : ''}`}
          title={isEditLesson ? 'Exit Edit Mode' : 'Edit Slide'}
        >
          {lessonManager.currentSlideUpdated ? (
            <LuSave size={20} />
          ) : (
            <Tooltip
              title={
                'You created this lesson or have editing rights to edit slides and exercise code.'
              }
            >
              {isEditLesson ? (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                </svg>
              ) : (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
                </svg>
              )}
            </Tooltip>
          )}
        </button>

        <button
          onClick={advancedEditorOpen}
          className='icon-button'
          title='Go to Editor'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' />
          </svg>
        </button>
      </div>

      {showContextMenu && isEditLesson && !isTyping && (
        <div
          className='context-menu'
          style={{
            left: Math.min(contextMenuPosition.x, window.innerWidth - 200),
            top: Math.max(contextMenuPosition.y - 40, 10),
          }}
        >
          <Tooltip title={'Add Image from Gallery'}>
            <MediaModal insertImage={insertImage}>
              {/* <MdImage size={24} /> */}
              <button
                onClick={() => {}}
                className='context-button image-btn'
                // title='Insert Image'
              >
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' />
                </svg>
              </button>
            </MediaModal>
          </Tooltip>

          <div className='divider'></div>

          <YouTubeInsertModal insertVideo={handleInsertVideo}>
            <button
              onClick={() => {}}
              className='context-button video-btn'
              title='Insert Video'
            >
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z' />
              </svg>
            </button>
          </YouTubeInsertModal>

          <div className='divider'></div>

          <button
            onClick={emojiSelectorOpen}
            ref={emojiSelectorAnchor}
            className='context-button emoji-btn'
            title='Insert Emoji'
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM15.5 11c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z' />
            </svg>
          </button>
        </div>
      )}

      {/* <div className='SaveEditContent'>
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
                <Tooltip
                  title={
                    'You created this lesson or have editing rights to edit slides and exercise code.'
                  }
                >
                  <span className='editableText'>Edit</span>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div> */}
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
