import { TextField, TextFieldProps, IconButton, InputAdornment } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'

type Props = TextFieldProps & {
  name: string
}

  const TransparentTextField = styled(TextField)<{ transparent: boolean }>(({ transparent }) => ({
    '& input[type="color"]': {
      backgroundColor: transparent ? 'transparent' : undefined, // Set transparent background if empty
      height: '40px', // Adjust the height to make the color box bigger
      cursor: 'pointer',      
    filter: transparent?'opacity(0.2)':'',
    },
  }))
export function RHFColorPicker({ name, helperText, margin, ...other }: Props): React.ReactElement | null {
    const { control } = useFormContext()
    
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TransparentTextField
          {...field}
          fullWidth
          value={field.value || ''} // Set empty string if value is null or undefined
          error={!!error}
          type="color" // Set color picker type
          margin={margin === 'normal' ? 'none' : margin}
              helperText={error ? error.message : helperText}
              transparent={!field.value} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => field.onChange('')} // Clear the color picker
                          edge="end"
                          title="Clear color value to be transparent"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          {...other}
        />
      )}
    />
  )
}
