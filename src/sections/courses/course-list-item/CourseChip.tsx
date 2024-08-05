import { Chip } from '@mui/material'

interface Props {
  text: string
  isLight: boolean
  sx?: Record<string, unknown>
}

export default function CourseChip({ text, isLight, sx }: Props): React.ReactElement {
  return (
    <Chip
      label={text}
      sx={{
        background: isLight ? '#919EAB52' : '#364954',
        color: isLight ? '#364954' : '#fff',
        fontWeight: 700,
        textTransform: 'uppercase',
        p: '0 5px',
        ...sx,
      }}
    />
  )
}
