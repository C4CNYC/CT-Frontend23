import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IoArrowDownCircle } from '@react-icons/all-files/io5/IoArrowDownCircle'

import { bgBlur } from '@/utils'

interface Props {
  onDownload?: VoidFunction
}

export function DownloadButton({ onDownload }: Props): React.ReactElement | null {
  const theme = useTheme()

  return (
    <IconButton
      // color="inherit"
      onClick={onDownload}
      sx={{
        p: 0,
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        opacity: 0,
        position: 'absolute',
        borderRadius: 'unset',
        // color: 'common.white',
        justifyContent: 'center',
        bgcolor: 'grey.800',
        color: 'common.white',
        transition: theme.transitions.create('opacity'),

        '&:hover': {
          opacity: 1,
          ...bgBlur({
            opacity: 0.64,
            color: theme.palette.grey[900],
          }),
        },
      }}
    >
      <IoArrowDownCircle size={24} />
    </IconButton>
  )
}
