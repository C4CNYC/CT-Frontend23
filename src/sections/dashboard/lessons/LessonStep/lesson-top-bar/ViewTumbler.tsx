import { IconButton } from '@mui/material'
import { Box } from '@mui/system'

import { Iconify } from '@/components/iconify'

interface ViewToomblerProps {
  fullScreenView: boolean
  allColumnsVisible: boolean
  onChangeSreenView: (value: boolean) => void
  onChangeColumnVisibility: (value: boolean) => void
  fullScreenOpen: () => void
  fullScreenClose: () => void
}

const ViewTumbler = ({
  fullScreenView,
  onChangeSreenView,
  onChangeColumnVisibility,
  fullScreenOpen,
  fullScreenClose,
  allColumnsVisible,
}: ViewToomblerProps): React.ReactElement => {
  const columnIcon = allColumnsVisible ? 'iconoir:view-columns-3' : 'iconoir:view-columns-2'
  const screenViewIcon = fullScreenView ? 'la:compress-arrows-alt' : 'mdi:arrow-expand-all'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#FBDD3F',
        borderRadius: '50px',
        padding: '0 12px',
        my: '8px',
      }}
    >
      <IconButton
        onClick={() => {
          onChangeColumnVisibility(!allColumnsVisible)
        }}
      >
        <Iconify icon={columnIcon} />
      </IconButton>
      <IconButton
        onClick={() => {
          fullScreenView ? fullScreenClose() : fullScreenOpen()
          onChangeSreenView(!fullScreenView)
        }}
      >
        <Iconify icon={screenViewIcon} />
      </IconButton>
    </Box>
  )
}

export default ViewTumbler
