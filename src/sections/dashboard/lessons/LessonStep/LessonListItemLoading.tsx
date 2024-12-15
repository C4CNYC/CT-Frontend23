import { Skeleton, Box, Typography } from '@mui/material'

import { useTranslate } from '@root/src/utils/translateHelper'

export function LessonListItemLoading() {
  const translate = useTranslate()
  return (
    <Box
      position='relative'
      display='inline-block'
      width='100%'
      height='84px'
    >
      <Typography
        variant='body2'
        position='absolute'
        width='100%'
        padding='30px'
        textAlign='center'
        color='textSecondary'
        zIndex={111}
      >
        {translate('slide_loader_text')}
      </Typography>
      <Skeleton
        variant='rectangular'
        width='100%'
        height='100%'
      />
    </Box>
  )
}
