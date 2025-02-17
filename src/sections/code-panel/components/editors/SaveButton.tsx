import Button from '@mui/material/Button'

import SaveIconTyniMce from '@root/src/sections/dashboard/lessons/LessonStep/LessonStepContent/SaveIconTynyMce'

interface Props {
  onClick: VoidFunction
  sx?: Record<string, unknown>
  iconColor?: string
}

export function SaveButton({ onClick, iconColor = '#637381', sx }: Props): JSX.Element {
  return (
    <Button
      key='left'
      onClick={onClick}
      sx={{
        flexShrink: 0,
        ml: 'auto!important',
        mt: 1,
        maxHeight: '30px',
        fontWeight: '400',
        color: '#637381',
        border: '.5px solid #637381',
        gap: 1,
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'rgba(225, 225, 225, 0.55)',
        },

        ...sx,
      }}
    >
      <SaveIconTyniMce
        color={iconColor}
        size={20}
      />
      Save
    </Button>
  )
}
