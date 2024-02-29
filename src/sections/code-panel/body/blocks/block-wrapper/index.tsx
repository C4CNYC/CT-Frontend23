import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react'

import { Box, Collapse, useTheme } from '@mui/material'

import useIsDesktop from '@/hooks/useIsDesktop'
import { useSelector } from '@/redux/store'
import { isClient } from '@/utils/env'

import { getBoxStyles } from './constants'
import Header from './header'
import TabButton from './tab-button'

interface IBlockWrapper {
  children: ReactNode
  className: 'instructions' | 'codeEditorTour' | 'browserTour'
  title: ReactNode
  icon: React.ReactElement
  closeIcon?: React.ReactElement
  hideTabsHandler?: () => void
  takeHeaderSettings?: (isOpen: boolean) => void
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

const BlockWrapper: FC<IBlockWrapper> = ({
  children,
  className,
  title,
  icon,
  closeIcon,
  hideTabsHandler,
  takeHeaderSettings,
}) => {
  const theme = useTheme()
  const isDesktop = useIsDesktop()
  const isTabletAndMobile = !isDesktop
  const boxStyles = useMemo(() => getBoxStyles(isTabletAndMobile, theme), [useTheme])
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  const getHeaderSettings = () => {
    if (isClient) {
      return JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(isClosedHeaders))
    }
  }

  const isTabLeft = isTabletAndMobile && activeTab !== 0
  const isTabRight = isTabletAndMobile && activeTab !== 2
  const [isClosedHeader, setIsClosedHeader] = useState<IHeaderSettings>(getHeaderSettings())

  const closeHeaderHandler = (): void => {
    setIsClosedHeader({ ...isClosedHeader, [className]: false })

    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ ...getHeaderSettings(), [className]: false })
    )
  }

  useEffect(() => {
    if (takeHeaderSettings) {
      takeHeaderSettings(isClosedHeader?.browserTour)
    }
  }, [takeHeaderSettings])

  return (
    <Box
      className={className}
      flex={'1 1 0px'}
      position='relative'
      sx={boxStyles}
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

export default BlockWrapper
