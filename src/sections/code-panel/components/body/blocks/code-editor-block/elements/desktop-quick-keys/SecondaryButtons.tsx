import { Box, Divider, useTheme } from '@mui/material'
import { FaAngleLeft } from '@react-icons/all-files/fa6/FaAngleLeft'
import { FaAngleRight } from '@react-icons/all-files/fa6/FaAngleRight'
import { FaKeyboard } from '@react-icons/all-files/fa6/FaKeyboard'

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
        <FaKeyboard size={20} />
      </QuickButton>

      <VerticalDivider />

      <QuickButton
        sx={{ minWidth: 30 }}
        onClick={handleClose}
        tooltipTitle='Compress'
      >
        {theme.direction === 'rtl' ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
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
