import ClearIcon from '@mui/icons-material/Clear'
import { TextField, TextFieldProps, IconButton, InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import { Controller, useFormContext } from 'react-hook-form'

type Props = TextFieldProps & {
  name: string
}

export function RHFColorPicker({
  name,
  helperText,
  margin,
  ...other
}: Props): React.ReactElement | null {
  const theme = useTheme()
  const { control } = useFormContext()

  const isRTL = theme.direction === 'rtl'

  const TransparentTextField = styled(TextField)<{ transparent: boolean }>(({ transparent }) => ({
    '& input[type="color"]': {
      backgroundColor: transparent ? 'transparent' : undefined, // Set transparent background if empty
      minHeight: '40px', // Adjust the height to make the color box bigger
      padding: isRTL ? '8px 0 8px 0' : '8px 8px 8px 8px',
      cursor: 'pointer',
      filter: transparent ? 'opacity(0.2)' : '',
    },
  }))

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TransparentTextField
          {...field}
          InputLabelProps={{
            sx: isRTL
              ? {
                  ml: 5,
                  color: '#fff',
                }
              : { color: '#fff' },
          }}
          fullWidth
          value={field.value || ''} // Set empty string if value is null or undefined
          error={!!error}
          type='color' // Set color picker type
          margin={margin === 'normal' ? 'none' : margin}
          helperText={error ? error.message : helperText}
          transparent={!field.value}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => field.onChange('')} // Clear the color picker
                  edge='end'
                  title='Clear color value to be transparent'
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  )
}
