import { Badge, Box, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import { Image } from '@/components'
import { useTranslate } from '@/utils/translateHelper'

import { getImageWrapperSx } from './constants'

interface Props {
  title: string
  subtitle: string
  img: string
  info: string
  color: string
  disabled?: boolean
  isNew?: boolean
}

export function SessionType({
  title,
  subtitle,
  img,
  info,
  color,
  disabled,
  isNew,
}: Props): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{ pr: { xs: 0, sm: 0, md: 1 }, width: '100%', justifyContent: 'space-between' }}
    >
      <Tooltip
        title={<Typography>{translate(info)}</Typography>}
        placement='top-end'
      >
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          color='info'
          badgeContent={'i'}
          invisible={isSmall}
        >
          <Box sx={() => ({ ...getImageWrapperSx(color) })}>
            <Image
              src={img}
              alt='hello step'
            />
          </Box>
        </Badge>
      </Tooltip>
      <Stack sx={{ pl: 2 }}>
        {disabled || isNew ? (
          <Badge
            sx={{
              '& .MuiBadge-anchorOriginTopRight': { top: 0 },
              left: '-10px',
              '& .MuiBadge-badge	': { color: '#fff', background: isNew ? '#FBDD3F' : '#364954' },
            }}
            badgeContent={translate(isNew ? 'on_boarding_new' : 'coming_soon')}
          >
            <Typography
              variant='h4'
              textAlign='start'
              gutterBottom
            >
              {translate(title)}
            </Typography>
          </Badge>
        ) : (
          <Typography
            variant='h4'
            textAlign='start'
            gutterBottom
          >
            {translate(title)}
          </Typography>
        )}

        <Typography
          variant='body2'
          textAlign='start'
          sx={{ maxWidth: '250px' }}
        >
          {translate(subtitle)}
        </Typography>
      </Stack>

      <Image
        src='/assets/on-boarding/arrow.svg'
        alt='arrow image'
        sx={{ minWidth: '38px', height: '60px' }}
      />
    </Stack>
  )
}
