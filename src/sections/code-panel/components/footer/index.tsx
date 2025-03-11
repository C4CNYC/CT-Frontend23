import { type FC } from 'react'

import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import dynamic from 'next/dynamic'

import LessonManager from '../lesson-manager'

import LessonFeedback from './lesson-feedback/LessonFeedback'
import type { MenuProps } from './menu'
import { type ProgressBottomBarProps } from './progress-bottom-bar'

const Menu = dynamic(async () => await import('./menu'))

export interface CodePanelFooterProps extends ProgressBottomBarProps, MenuProps {}

export const CodePanelFooter: FC<CodePanelFooterProps> = ({ publicPage = false, language }) => {
  return (
    <Stack
      pl='20px'
      pr='20px'
      height='55px'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      position='relative'
      gap={10}
    >
      <LessonManager />

      <LessonFeedback>
        <Button
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            '&:hover': { bgcolor: 'rgba(99, 115, 129, 0.08)' },
          })}
        >
          Feedback
        </Button>
      </LessonFeedback>

      <Stack
        spacing={2}
        direction='row'
        width='100%'
        justifyContent='flex-end'
        alignItems='center'
      >
        {/* Move progress to the Slider block */}
        {/* {activeTab === 0 ? <ProgressBottomBar sliderSteps={sliderSteps} /> : null} */}

        <Menu
          language={language}
          publicPage={publicPage}
        />
      </Stack>
    </Stack>
  )
}

export default CodePanelFooter
