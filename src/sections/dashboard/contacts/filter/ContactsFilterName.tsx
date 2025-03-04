import { InputAdornment, TextField } from '@mui/material'
import { FiSearch } from '@react-icons/all-files/fi/FiSearch'

interface Props {
  filterName: string
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ContactsFilterName({
  filterName,
  onFilterName,
}: Props): React.ReactElement | null {
  return (
    <TextField
      size='small'
      value={filterName}
      onChange={onFilterName}
      placeholder='Search...'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <FiSearch style={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  )
}
