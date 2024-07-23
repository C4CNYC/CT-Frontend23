import { Box, Divider } from '@mui/material'
import { MdKeyboardHide } from '@react-icons/all-files/md/MdKeyboardHide'
import { TbTool } from '@react-icons/all-files/tb/TbTool'

import QuickButton from './QuickButton'

export default function SecondaryButtons({
  handleChangeButtons,
  handleClose,
}: {
  handleChangeButtons: VoidFunction
  handleClose: VoidFunction
}) {
  return (
    <Box sx={{ height: 30, display: 'flex' }}>
      <QuickButton sx={{ minWidth: 30 }}> {'<'} </QuickButton>
      <QuickButton sx={{ minWidth: 30 }}> {'>'} </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> {'/'} </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> {'{ }'} </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> = </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> + </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> " </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> ' </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> : </QuickButton>

      <VerticalDivider />

      <QuickButton sx={{ minWidth: 30 }}> ; </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={handleClose}
        tooltipTitle='Compress'
      >
        <MdKeyboardHide size={20} />
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        tooltipTitle='Back'
        onClick={handleChangeButtons}
        sx={{ minWidth: 30 }}
      >
        <TbTool size={20} />
      </QuickButton>
    </Box>
  )
}

const VerticalDivider = () => {
  return (
    <Divider
      orientation='vertical'
      variant='middle'
      sx={{ bgcolor: '#d6d6d6', height: 'auto', my: '4px' }}
    />
  )
}
