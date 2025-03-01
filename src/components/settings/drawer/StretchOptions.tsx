import { Box, Stack } from '@mui/material'
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack'
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward'

import { useSettingsContext } from '../SettingsContext'
import { StyledCard } from '../styles'

export default function StretchOptions(): React.ReactElement {
  const { themeStretch, onToggleStretch } = useSettingsContext()

  return (
    <StyledCard
      selected={themeStretch}
      onClick={onToggleStretch}
      sx={{ height: 48, px: 1 }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          width: 0.24,
          transition: (theme) => theme.transitions.create('width'),
          ...(themeStretch && {
            width: 0.5,
          }),
        }}
      >
        {themeStretch ? <IoIosArrowBack /> : <IoIosArrowForward />}

        <Box sx={{ flexGrow: 1, borderBottom: 'dashed 1.5px currentcolor' }} />

        {themeStretch ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </Stack>
    </StyledCard>
  )
}
