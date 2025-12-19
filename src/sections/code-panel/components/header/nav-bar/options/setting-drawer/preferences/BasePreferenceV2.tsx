import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

interface IBasePreferenceV2 {
  children: React.ReactElement
  title: string
  abandonmentIcon?: React.ReactElement
}

const BasePreferenceV2 = ({
  title,
  children,
  abandonmentIcon,
}: IBasePreferenceV2): React.ReactElement => {
  const theme = useTheme()
  return (
    <Box
      p='8px 16px 8px 16px'
      bgcolor={theme.palette.mode === 'light' ? '#F0EEEE' : theme.palette.background.neutral}
      borderRadius='15px'
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
      >
        {abandonmentIcon ?? null}
        <Typography variant='subtitle1'>{title.toUpperCase()}</Typography>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='flex-end'
          flexGrow={1}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default BasePreferenceV2
