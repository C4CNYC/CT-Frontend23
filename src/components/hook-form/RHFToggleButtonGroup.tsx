import { SxProps, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material'
import { Controller, FieldError, useFormContext } from 'react-hook-form'

type Props = ToggleButtonGroupProps & {
  name: string
  helperText?: string
  sxGroup?: SxProps
  sxButton?: SxProps
  options: Array<{ key: string; value: string }>
  error?: FieldError
}

export function RHFToggleButtonGroup({
  name,
  options,
  helperText,
  sxGroup,
  sxButton,
  error,
  ...other
}: Props): React.ReactElement | null {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ToggleButtonGroup
          exclusive
          aria-label='level'
          sx={sxGroup}
          {...field}
          {...other}
        >
          {options.map((el) => (
            <ToggleButton
              sx={sxButton}
              value={el.key}
              key={el.key}
            >
              {el.value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  )
}
