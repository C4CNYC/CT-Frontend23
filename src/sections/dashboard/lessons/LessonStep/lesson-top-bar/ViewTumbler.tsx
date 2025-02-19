import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { IoExpandOutline } from 'react-icons/io5'
import { LiaCompressArrowsAltSolid } from 'react-icons/lia'
import { TbColumns3, TbColumns2 } from 'react-icons/tb'
interface ViewToomblerProps {
  fullScreenView: boolean
  allColumnsVisible: boolean
  onChangeSreenView: (value: boolean) => void
  onChangeColumnVisability: (value: boolean) => void
  fullScreenOpen: () => void
  fullScreenClose: () => void
}

const ViewTumbler = ({
  fullScreenView,
  onChangeSreenView,
  onChangeColumnVisability,
  fullScreenOpen,
  fullScreenClose,
  allColumnsVisible,
}: ViewToomblerProps): React.ReactElement => {
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
          onChangeColumnVisability(!allColumnsVisible)
        }}
      >
        {allColumnsVisible ? <TbColumns3 /> : <TbColumns2 />}
      </IconButton>
      <IconButton
        onClick={() => {
          fullScreenView ? fullScreenClose() : fullScreenOpen()
          onChangeSreenView(!fullScreenView)
        }}
      >
        {fullScreenView ? <LiaCompressArrowsAltSolid /> : <IoExpandOutline />}
      </IconButton>
    </Box>
  )
}

export default ViewTumbler
