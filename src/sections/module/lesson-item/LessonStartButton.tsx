import { Box, Link, Typography } from '@mui/material'
import { TbPlayerPlay } from '@react-icons/all-files/tb/TbPlayerPlay'
import NextLink from 'next/link'

import { useTranslate } from '@root/src/utils/translateHelper'

import { getStartLinkSx, LINK_BTN_SX } from './constants'

interface LessonStartButtonProps {
  customHref: string
}
const LessonStartButton = ({ customHref }: LessonStartButtonProps) => {
  const translate = useTranslate()
  return (
    <Link
      component={NextLink}
      href={customHref}
      underline='none'
      sx={getStartLinkSx()}
    >
      <Typography variant='h5'> {translate('actions_start')} </Typography>
      <Box sx={LINK_BTN_SX}>
        <TbPlayerPlay
          size={30}
          style={{ color: '#364954' }}
        />
      </Box>
    </Link>
  )
}

export default LessonStartButton
