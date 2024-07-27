import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

interface IBasePreference {
  children: React.ReactElement
  title: string
  abandonmentIcon?: React.ReactElement
}

const BasePreference = ({
  title,
  children,
  abandonmentIcon,
}: IBasePreference): React.ReactElement => {
  const theme = useTheme()
  return (
    <Box
      p='25px 30px 30px 30px'
      bgcolor={theme.palette.mode === 'light' ? '#F0EEEE' : theme.palette.background.neutral}
      borderRadius='15px'
    >
      <Box
        mb='20px'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='subtitle1'>{title.toUpperCase()}</Typography>
        {abandonmentIcon ?? null}
      </Box>
      {children}
    </Box>
  )
}

export default BasePreference
