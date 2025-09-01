import React, { useState, useRef, useEffect } from 'react'

import { Tooltip, Box, IconButton } from '@mui/material'
import { FaRegSmileWink } from '@react-icons/all-files/fa/FaRegSmileWink'
import { FaVideo } from '@react-icons/all-files/fa/FaVideo'
import { FaImage } from '@react-icons/all-files/fa6/FaImage'

import { CONTEXT_BUTTON_STYLES, CONTEXT_MENU_STYLES, DIVIDER_STYLES, ARROWS_STYLES } from './styles'

const AdaptivePopup = React.memo(
  ({
    isEditMode,
    emojiSelectorRef,
    editableDivRef,
    iframeSliderRef,
    handleOpenEmojiSelector,
    handleOpenMediaInsertModal,
    handleOpenYoutubeInsertModal,
  }: any) => {
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
    const [menuPosition, setMenuPosition] = useState('top')

    const cursorPositionRef = useRef<Range | null>(null)
    let hideTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

    const saveCursorPosition = () => {
      const iframeDoc = iframeSliderRef.current?.contentDocument
      const selection = iframeDoc?.getSelection()
      if (selection && (selection?.rangeCount ?? 0) > 0) {
        cursorPositionRef.current = selection.getRangeAt(0).cloneRange()
      }
    }

    const getCaretPosition = () => {
      const iframeDoc = iframeSliderRef.current?.contentDocument
      const selection = iframeDoc?.getSelection()
      if (!selection || selection.rangeCount === 0) return null

      const range = selection.getRangeAt(0)

      const span = iframeDoc.createElement('span')
      span.innerHTML = '&#8203;'
      range.insertNode(span)

      const rect = span.getBoundingClientRect()
      const iframeRect = iframeSliderRef.current.getBoundingClientRect()

      span.remove()

      return {
        x: rect.left - iframeRect.left,
        y: rect.top - iframeRect.top,
        height: rect.height || 20,
      }
    }

    const showPopup = () => {
      const caretPos = getCaretPosition()
      if (!caretPos) return

      const x = caretPos.x
      const y = caretPos.y
      const caretHeight = caretPos.height

      const containerWidth = iframeSliderRef.current?.offsetWidth || 0
      const containerHeight = iframeSliderRef.current?.offsetHeight || 0

      const popupWidth = 96
      const popupHeight = 30

      const edgeThreshold = 70

      let position = 'top'
      let popupX = x
      let popupY = y

      const distanceFromTop = y
      const distanceFromBottom = containerHeight - y
      const distanceFromLeft = x
      const distanceFromRight = containerWidth - x

      if (distanceFromRight < edgeThreshold && distanceFromRight < distanceFromLeft) {
        position = 'left'
        popupX = x - popupWidth - 12
        popupY = y - popupHeight / 2
      } else if (distanceFromLeft < edgeThreshold && distanceFromLeft < distanceFromRight) {
        position = 'right'
        popupX = x + 12
        popupY = y - popupHeight / 2
      } else if (distanceFromTop < edgeThreshold) {
        position = 'bottom'
        popupX = x - popupWidth / 2
        popupY = y + caretHeight + 12
      } else {
        position = 'top'
        popupX = x - popupWidth / 2
        popupY = y - popupHeight - 12
      }

      const padding = 8
      popupX = Math.max(padding, Math.min(popupX, containerWidth - popupWidth - padding))
      popupY = Math.max(padding, Math.min(popupY, containerHeight - popupHeight - padding))

      const iframeRect = iframeSliderRef.current.getBoundingClientRect()
      const finalX = popupX + iframeRect.left
      const finalY = popupY + iframeRect.top

      setContextMenuPosition({ x: finalX + 10, y: finalY + 60 })
      setMenuPosition(position)
      setShowContextMenu(true)

      clearTimeout(hideTimeout.current)
      hideTimeout.current = setTimeout(hidePopup, 4000)
    }

    const hidePopup = () => {
      setShowContextMenu(false)
      clearTimeout(hideTimeout.current)
    }

    const handleContentClick = (e: MouseEvent) => {
      if (!isEditMode) return

      saveCursorPosition()

      setTimeout(() => {
        showPopup()
      }, 50)
    }

    const handleContentFocus = () => {
      if (!isEditMode) return
      saveCursorPosition()

      setTimeout(() => {
        showPopup()
      }, 50)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEditMode) return

      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
        setShowContextMenu(false)
      }

      const navKeys = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ]
      if (navKeys.includes(e.key)) {
        setTimeout(showPopup, 10)
      }

      saveCursorPosition()
    }

    useEffect(() => {
      const handleSelectionChange = () => {
        const iframeDoc = iframeSliderRef.current?.contentDocument
        if (iframeDoc?.activeElement === editableDivRef?.current && showContextMenu && isEditMode) {
          setTimeout(showPopup, 10)
        }
      }

      const iframeDoc = iframeSliderRef.current?.contentDocument
      iframeDoc?.addEventListener('selectionchange', handleSelectionChange)

      return () => iframeDoc?.removeEventListener('selectionchange', handleSelectionChange)
    }, [showContextMenu, isEditMode, iframeSliderRef])

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const iframeRect = iframeSliderRef.current?.getBoundingClientRect()
        if (iframeRect) {
          const clickX = e.clientX
          const clickY = e.clientY

          if (
            clickX < iframeRect.left ||
            clickX > iframeRect.right ||
            clickY < iframeRect.top ||
            clickY > iframeRect.bottom
          ) {
            hidePopup()
          }
        }
      }

      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }, [iframeSliderRef])

    const getArrowClass = () => {
      switch (menuPosition) {
        case 'top':
          return 'context-menu-top'
        case 'bottom':
          return 'context-menu-bottom'
        case 'left':
          return 'context-menu-left'
        case 'right':
          return 'context-menu-right'
        default:
          return 'context-menu-top'
      }
    }

    useEffect(() => {
      if (!isEditMode) return
      if (!editableDivRef.current || !iframeSliderRef.current) return

      const onIframeLoad = () => {
        if (editableDivRef.current) {
          editableDivRef.current.removeEventListener('click', handleContentClick)
          editableDivRef.current.removeEventListener('focus', handleContentFocus)
          editableDivRef.current.removeEventListener('keydown', handleKeyDown)

          editableDivRef.current.addEventListener('click', handleContentClick)
          editableDivRef.current.addEventListener('focus', handleContentFocus)
          editableDivRef.current.addEventListener('keydown', handleKeyDown)
        }
      }

      if (iframeSliderRef.current.contentDocument?.readyState === 'complete') {
        onIframeLoad()
      } else {
        iframeSliderRef.current.addEventListener('load', onIframeLoad)
      }

      return () => {
        if (editableDivRef.current) {
          editableDivRef.current.removeEventListener('click', handleContentClick)
          editableDivRef.current.removeEventListener('focus', handleContentFocus)
          editableDivRef.current.removeEventListener('keydown', handleKeyDown)
        }
        iframeSliderRef.current?.removeEventListener('load', onIframeLoad)
      }
    }, [isEditMode, editableDivRef, iframeSliderRef])

    return (
      <>
        {showContextMenu && isEditMode && (
          <Box
            sx={{
              ...CONTEXT_MENU_STYLES,
              left: `${contextMenuPosition.x}px`,
              top: `${contextMenuPosition.y}px`,
            }}
          >
            <Box sx={ARROWS_STYLES[menuPosition as keyof typeof ARROWS_STYLES]} />

            <Tooltip title='Add Image from Gallery'>
              <Box>
                <IconButton
                  sx={CONTEXT_BUTTON_STYLES}
                  onClick={handleOpenMediaInsertModal}
                >
                  <FaImage size={10} />
                </IconButton>
              </Box>
            </Tooltip>

            <Box sx={DIVIDER_STYLES} />

            <Tooltip title='Insert Video from YouTube'>
              <Box>
                <IconButton
                  sx={CONTEXT_BUTTON_STYLES}
                  onClick={handleOpenYoutubeInsertModal}
                >
                  <FaVideo size={10} />
                </IconButton>
              </Box>
            </Tooltip>

            <Box sx={DIVIDER_STYLES} />

            <Tooltip title='Insert Emoji'>
              <IconButton
                sx={CONTEXT_BUTTON_STYLES}
                onClick={handleOpenEmojiSelector}
                ref={emojiSelectorRef}
              >
                <FaRegSmileWink size={10} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </>
    )
  }
)

export default AdaptivePopup
