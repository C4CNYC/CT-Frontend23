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
      // Отримуємо selection з iframe документа
      const iframeDoc = iframeSliderRef.current?.contentDocument
      const selection = iframeDoc?.getSelection()
      if (selection && (selection?.rangeCount ?? 0) > 0) {
        cursorPositionRef.current = selection.getRangeAt(0).cloneRange()
      }
    }

    const getCaretPosition = () => {
      // Працюємо з selection з iframe документа
      const iframeDoc = iframeSliderRef.current?.contentDocument
      const selection = iframeDoc?.getSelection()
      if (!selection || selection.rangeCount === 0) return null

      const range = selection.getRangeAt(0)

      // Створюємо тимчасовий span для точного визначення позиції курсора
      const span = iframeDoc.createElement('span')
      span.innerHTML = '&#8203;' // Zero-width space
      range.insertNode(span)

      const rect = span.getBoundingClientRect()
      // Отримуємо координати iframe відносно основного документа
      const iframeRect = iframeSliderRef.current.getBoundingClientRect()

      // Видаляємо тимчасовий span
      span.remove()

      return {
        // Координати відносно основного документа (iframe + позиція в iframe)
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

      // Розміри iframe (контейнера)
      const containerWidth = iframeSliderRef.current?.offsetWidth || 0
      const containerHeight = iframeSliderRef.current?.offsetHeight || 0

      // Розміри попапу (точні розміри з вашого CSS)
      // const popupWidth = 119
      // const popupHeight = 35
      const popupWidth = 96
      const popupHeight = 30

      // Відстань від краю для перемикання позиції
      const edgeThreshold = 70

      let position = 'top'
      let popupX = x
      let popupY = y

      // Визначаємо відстані від країв
      const distanceFromTop = y
      const distanceFromBottom = containerHeight - y
      const distanceFromLeft = x
      const distanceFromRight = containerWidth - x

      // Логіка вибору позиції
      if (distanceFromRight < edgeThreshold && distanceFromRight < distanceFromLeft) {
        // Близько до правого краю - показуємо зліва від курсора
        position = 'left'
        popupX = x - popupWidth - 12
        popupY = y - popupHeight / 2
      } else if (distanceFromLeft < edgeThreshold && distanceFromLeft < distanceFromRight) {
        // Близько до лівого краю - показуємо справа від курсора
        position = 'right'
        popupX = x + 12
        popupY = y - popupHeight / 2
      } else if (distanceFromTop < edgeThreshold) {
        // Близько до верхнього краю - показуємо під курсором
        position = 'bottom'
        popupX = x - popupWidth / 2
        popupY = y + caretHeight + 12
      } else {
        // За замовчуванням - над курсором
        position = 'top'
        popupX = x - popupWidth / 2
        popupY = y - popupHeight - 12
      }

      // Корегуємо позицію щоб попап не виходив за межі iframe
      const padding = 8
      popupX = Math.max(padding, Math.min(popupX, containerWidth - popupWidth - padding))
      popupY = Math.max(padding, Math.min(popupY, containerHeight - popupHeight - padding))

      // Додаємо offset iframe відносно основного документа
      const iframeRect = iframeSliderRef.current.getBoundingClientRect()
      const finalX = popupX + iframeRect.left
      const finalY = popupY + iframeRect.top

      setContextMenuPosition({ x: finalX + 10, y: finalY + 60 })
      setMenuPosition(position)
      setShowContextMenu(true)

      // Автоматично ховаємо попап через 4 секунди
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

      // Ховаємо меню при натисканні клавіш друку
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
        setShowContextMenu(false)
      }

      // Показуємо при навігаційних клавішах
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

    // Обробник зміни селекції в iframe
    useEffect(() => {
      const handleSelectionChange = () => {
        const iframeDoc = iframeSliderRef.current?.contentDocument
        if (iframeDoc?.activeElement === editableDivRef?.current && showContextMenu && isEditMode) {
          setTimeout(showPopup, 10)
        }
      }

      // Додаємо обробник до iframe документа
      const iframeDoc = iframeSliderRef.current?.contentDocument
      iframeDoc?.addEventListener('selectionchange', handleSelectionChange)

      return () => iframeDoc?.removeEventListener('selectionchange', handleSelectionChange)
    }, [showContextMenu, isEditMode, iframeSliderRef])

    // Ховаємо попап при кліці поза iframe
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const iframeRect = iframeSliderRef.current?.getBoundingClientRect()
        if (iframeRect) {
          const clickX = e.clientX
          const clickY = e.clientY

          // Перевіряємо чи клік був поза iframe
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
          // Видаляємо попередні обробники щоб уникнути дублювання
          editableDivRef.current.removeEventListener('click', handleContentClick)
          editableDivRef.current.removeEventListener('focus', handleContentFocus)
          editableDivRef.current.removeEventListener('keydown', handleKeyDown)

          // Додаємо нові обробники
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
