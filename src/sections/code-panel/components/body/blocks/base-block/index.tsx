import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react'

import { Box, Collapse, useTheme } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { localStorageAvailable } from '@/utils'

import { getBoxStyles } from './constants'
import Header from './header'
import TabButton from './tab-button'

interface IBaseBlock {
  children: ReactNode
  className: 'instructions' | 'codeEditorTour' | 'browserTour'
  title: ReactNode
  icon: React.ReactElement
  closeIcon?: React.ReactElement
  hideTabsHandler?: () => void
  takeHeaderSettings?: (isOpen: boolean) => void
  styles?: { [key: string]: any }
}

const isClosedHeaders = {
  instructions: true,
  codeEditorTour: true,
  browserTour: true,
}

interface IHeaderSettings {
  instructions: boolean
  codeEditorTour: boolean
  browserTour: boolean
}

const localStorageKey = 'HeadersSettings'

const BaseBlock: FC<IBaseBlock> = ({
  children,
  className,
  title,
  icon,
  hideTabsHandler,
  styles,
}) => {
  const theme = useTheme()
  const storageAvailable = localStorageAvailable()
  const isDesktop = useIsDesktop()
  const isTabletAndMobile = !isDesktop
  const boxStyles = useMemo(
    () => getBoxStyles(isTabletAndMobile, theme),
    [theme, isTabletAndMobile]
  )
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  const getHeaderSettings = () => {
    if (storageAvailable) {
      const headerSettings = JSON.parse(
        window.localStorage.getItem(localStorageKey) ?? JSON.stringify(isClosedHeaders)
      )
      return headerSettings
    }
  }

  const isTabLeft = isTabletAndMobile && activeTab !== 0
  const isTabRight = isTabletAndMobile && activeTab !== 2
  const [isClosedHeader, setIsClosedHeader] = useState<IHeaderSettings>(() => getHeaderSettings())

  const closeHeaderHandler = (): void => {
    setIsClosedHeader({ ...isClosedHeader, [className]: false })

    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ ...getHeaderSettings(), [className]: false })
    )

    window.dispatchEvent(
      new CustomEvent('localstorage-update', {
        detail: { key: localStorageKey, value: { ...getHeaderSettings(), [className]: false } },
      })
    )
  }

  useEffect(() => {
    const closeTimeout = setTimeout(closeHeaderHandler, 1000 * 60 * 5)
    return () => clearTimeout(closeTimeout)
  }, [])

  return (
    <Box
      className={className}
      sx={boxStyles}
      style={styles}
    >
      <Collapse in={isClosedHeader?.[className]}>
        <Header
          title={title}
          icon={icon}
          hideTabsHandler={hideTabsHandler}
          closeHandler={closeHeaderHandler}
        />
      </Collapse>

      {children}

      {isTabLeft && <TabButton orientation='left' />}

      {isTabRight && <TabButton orientation='right' />}
    </Box>
  )
}

export default BaseBlock
