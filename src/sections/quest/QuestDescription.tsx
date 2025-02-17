import { Box } from '@mui/material'
import { useTheme } from '@mui/system'

interface Props {
  description: string
}

export default function QuestDescription({ description }: Props) {
  const theme = useTheme()
  return (
    <Box sx={{ pb: 3, pt: 2 }}>
      <div
        style={{
          padding: '10px',
          backgroundColor: theme.palette.background.default,
          minHeight: '100px',
          borderRadius: '16px',
          boxShadow:
            '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        }}
      >
        {description}
      </div>
    </Box>
  )
}
