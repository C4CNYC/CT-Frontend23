import { Stack, StackProps, Tooltip, Typography } from '@mui/material'
import { LuInfo } from '@react-icons/all-files/lu/LuInfo'

const SPACING = 2.5

interface Props extends StackProps {
  title: string
  tooltip?: string
}

export default function Block({
  title,
  tooltip,
  children,
  sx,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Stack
      spacing={1.5}
      sx={{ mb: SPACING, ...sx }}
      {...other}
    >
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          color: 'text.secondary',
        }}
      >
        <Typography
          variant='caption'
          sx={{ fontWeight: 'fontWeightMedium' }}
        >
          {title}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltip}>
            <LuInfo
              style={{ marginRight: 0.5, marginLeft: 0.5 }}
              size={16}
            />
          </Tooltip>
        )}
      </Stack>

      {children}
    </Stack>
  )
}
