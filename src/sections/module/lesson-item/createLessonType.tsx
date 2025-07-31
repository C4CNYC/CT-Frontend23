import { Typography, Tooltip } from '@mui/material'

type CreateLessonTypeParams = {
  label: string
  tooltip: string
  icon: React.ReactNode
  color?: string
  gradient?: string
}

export const createLessonType = ({
  label,
  tooltip,
  icon,
  color,
  gradient,
}: CreateLessonTypeParams) => ({
  title: (
    <Tooltip
      slotProps={{
        popper: { disablePortal: true },
        tooltip: {
          sx: {
            maxWidth: 250,
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
        },
      }}
      title={
        <Typography
          variant='body2'
          p={1}
        >
          {tooltip}
        </Typography>
      }
    >
      <Typography
        variant='body2'
        sx={{
          ...(gradient
            ? {
                background: gradient,
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : {
                color: color || 'text.primary',
              }),
        }}
      >
        {label}
      </Typography>
    </Tooltip>
  ),
  icon,
})
