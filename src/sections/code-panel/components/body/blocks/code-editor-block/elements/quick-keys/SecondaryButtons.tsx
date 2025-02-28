import { Box, Divider, useTheme } from '@mui/material'
import { FaKeyboard } from '@react-icons/all-files/fa6/FaKeyboard'
import { IoClose } from '@react-icons/all-files/io5/IoClose'

import { PasteInitiate } from '@root/src/sections/code-panel/lib/events'

import QuickButton from './QuickButton'

export default function SecondaryButtons({
  handleChangeButtons,
  handleClose,
}: {
  handleChangeButtons: VoidFunction
  handleClose: VoidFunction
}) {
  const theme = useTheme()
  return (
    <Box sx={{ height: 30, display: 'flex' }}>
      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={handleClose}
        tooltipTitle='Compress'
      >
        <IoClose size={20} />
      </QuickButton>
      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('<')}
      >
        {' '}
        {'<'}{' '}
      </QuickButton>
      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('>')}
      >
        {' '}
        {'>'}{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('/')}
      >
        {' '}
        {'/'}{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('{ }')}
      >
        {' '}
        {'{ }'}{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('( )')}
      >
        {' '}
        {'( )'}{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('=')}
      >
        {' '}
        ={' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('+')}
      >
        {' '}
        +{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate('"')}
      >
        {' '}
        "{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate("'")}
      >
        {' '}
        '{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate(':')}
      >
        {' '}
        :{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={PasteInitiate(';')}
      >
        {' '}
        ;{' '}
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        tooltipTitle='Functions'
        onClick={handleChangeButtons}
        sx={{ minWidth: 30 }}
      >
        <FaKeyboard
          size={20}
          color='#FBDD3F'
        />
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
