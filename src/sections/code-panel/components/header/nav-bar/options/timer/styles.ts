import { IconButton, InputBase, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const InputNumber = styled(InputBase)({
  width: '112px',
  height: '112px',
  border: '1px solid #000000',
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& input': {
    fontSize: '70px',
    lineHeight: '75px',
    padding: 0,
    width: '75px',
    height: '75px',
    borderBottom: '1px solid #000000',
    textAlign: 'center',
    caretColor: '#C4C4C4',
    color: '#364954',
  },
})

export const TextHint = styled(Typography)({
  fontSize: '26px',
  lineHeight: '26px',
  color: '#364954',
  marginTop: '10px',
})

export const FinishText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#364954',
})

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '5px',
  right: '5px',
  width: '32px',
  height: '32px',
  color: '#808080',
  '& svg': {
    stroke: '#808080',
    strokeWidth: '2',
    fontSize: '24px',
  },
  '&:hover': {
    background: '#ffffff',
  },
})
