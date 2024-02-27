import { type FC, type ReactNode } from 'react'

import { Stack } from '@mui/system'
import dynamic from 'next/dynamic'

import { useSelector } from '@/redux/store'

import type { MenuProps } from './menu'
import ProgressBottomBar, { type ProgressBottomBarProps } from './progress-bottom-bar'

const Menu = dynamic(async () => await import('./menu'))

export interface CodePanelFooterProps extends ProgressBottomBarProps, MenuProps {
  lessonManagerComponent: ReactNode
}

const CodePanelFooter: FC<CodePanelFooterProps> = ({
  publicPage = false,
  sliderSteps,
  language,
  lessonManagerComponent,
}) => {
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)
  return (
    <Stack
      pl='20px'
      pr='20px'
      height='55px'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      position='relative'
    >
      {lessonManagerComponent}

      <Stack
        spacing={2}
        direction='row'
        width='100%'
        justifyContent='flex-end'
        alignItems='center'
      >
        {activeTab === 0 ? <ProgressBottomBar sliderSteps={sliderSteps} /> : null}

        <Menu
          language={language}
          publicPage={publicPage}
        />
      </Stack>
    </Stack>
  )
}

export default CodePanelFooter
