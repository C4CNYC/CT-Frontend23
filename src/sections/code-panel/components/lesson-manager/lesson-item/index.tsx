import { type FC, useMemo } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'

import { Accordion, AccordionDetails, AccordionSummary } from '@/components'
import useIsDesktop from '@/hooks/useIsDesktop'
import { type Unit } from '@/redux/interfaces/challenges.interface'
import { useSelector } from '@/redux/store'

import { ACC_SUMMARY_SX, DIVIDER_SX, LIST_SX, getButtonSx, getTypSx } from './constants'

interface ILessonItem {
  module: Unit
  onClick: (lessonId: string, moduleId: string) => void
  onClose: () => void
}

const MAX_TEXT_LENGTH = 39

export const LessonItem: FC<ILessonItem> = ({ module, onClick, onClose }) => {
  const theme = useTheme()
  const isDesktop = useIsDesktop()

  const currentLessonId = useSelector((state) => state.codePanelGlobal.lessonId)

  const typSx = useMemo(() => getTypSx(!isDesktop), [isDesktop])
  const { tooltipText, isLessonsExists } = useMemo(
    () => ({
      isLessonsExists: module.lessons.length > 0,
      tooltipText: module.name.length > MAX_TEXT_LENGTH ? module.name : '',
    }),
    [module]
  )

  return (
    <Stack key={module.id}>
      <Accordion defaultExpanded>
        <AccordionSummary
          sx={ACC_SUMMARY_SX}
          expandIcon={<ExpandMoreIcon />}
        >
          <Tooltip title={tooltipText}>
            <Typography
              variant='h6'
              noWrap
              sx={typSx}
            >
              {module.name}
            </Typography>
          </Tooltip>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <List sx={LIST_SX}>
            {!isLessonsExists && <ListItem>No lessons</ListItem>}

            {module.lessons.map((lesson) => (
              <ListItemButton
                key={lesson.id}
                onClick={() => {
                  onClick(lesson.id, module.id)
                  onClose()
                }}
                sx={getButtonSx(lesson.id === currentLessonId, theme.palette.mode === 'light')}
              >
                <Box display='flex'>
                  <Typography
                    ml={2}
                    variant='subtitle2'
                  >
                    {lesson.name}
                  </Typography>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Divider sx={DIVIDER_SX} />
    </Stack>
  )
}
 
