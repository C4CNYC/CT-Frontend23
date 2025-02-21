import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'

import { Iconify } from '@/components/iconify'

import { useLocales } from '../../../../locales'

interface Props {
  filterName: string
  onResetFilter: VoidFunction
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SchoolTableToolbar({
  filterName,
  onFilterName,
  onResetFilter,
}: Props): React.ReactElement | null {
  const { translate } = useLocales()

  return (
    <Stack
      spacing={2}
      alignItems='center'
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ pb: 3 }}
    >
      <Box
        display='flex'
        flexDirection='row'
        width='100%'
        gap='25px'
      >
        <TextField
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder={`${translate('actions_search')}`}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify
                  icon='eva:search-fill'
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button
          color='error'
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<FiTrash2 />}
        >
          {`${translate('actions_clear')}`}
        </Button>
      </Box>
    </Stack>
  )
}
