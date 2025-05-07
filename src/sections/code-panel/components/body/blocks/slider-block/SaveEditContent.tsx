import { Button } from '@mui/material'
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import { HiMiniArrowsPointingIn } from '@react-icons/all-files/hi2/HiMiniArrowsPointingIn'

import PersonIcon from '@root/src/assets/icons/PersonIcon'
import { useLessonManager } from '@root/src/sections/code-panel/lib/LessonManagerContext'
import { useTranslate } from '@root/src/utils/translateHelper'

import {
  AVATAR_STYLES,
  GROUP_TITLE_STYLES,
  STACK_GROUP_STYLES,
  STACK_STYLES,
  TRIBE_NAME_STYLES,
} from './SaveEditContentStyles'

export function SaveEditContent({}: any) {
  const lessonManager = useLessonManager()
  const translate = useTranslate()
  if (!lessonManager.userIsOwner) return null
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className=''
        style={{
          position: 'absolute',
          top: '1.3rem',
        }}
      >
        <Stack sx={STACK_STYLES}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='avatar'
              sx={AVATAR_STYLES}
            >
              🤖
            </Avatar>
            <Stack sx={STACK_GROUP_STYLES}>
              <Typography
                variant='body2'
                sx={GROUP_TITLE_STYLES}
              >
                {translate('code_panel_header_group')}
              </Typography>

              <Stack>
                <Tooltip title={''}>
                  <Typography
                    variant='subtitle2'
                    sx={TRIBE_NAME_STYLES}
                  >
                    {' '}
                    Kedi
                  </Typography>
                </Tooltip>
              </Stack>
            </Stack>
            {lessonManager.currentSlideUpdated ? (
              <Button
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  fontWeight: 200,
                  '&:hover': {
                    fontWeight: 700,
                    // color: theme.palette.secondary.contrastText,
                    background: '#99f1',
                  },
                })}
                onClick={lessonManager.saveSlideDB}
              >
                <HiMiniArrowsPointingIn size={18} />
                Save
              </Button>
            ) : (
              <span style={{ color: '#99f' }}>Editable</span>
            )}
            <PersonIcon
              display='flex'
              justifyContent='center'
              alignItems='center'
            />
          </Box>
        </Stack>
      </div>
    </div>
  )
}
