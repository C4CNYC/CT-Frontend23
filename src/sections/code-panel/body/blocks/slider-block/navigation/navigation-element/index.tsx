import { type FC, useMemo } from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Button, type SxProps } from '@mui/material'

import { useTranslate } from '@/utils/translateHelper'

import { BtnType } from '..'

interface INavigationElement {
  disabled?: boolean
  direction?: 'prev' | 'next'
  onClick: () => void
  sx?: SxProps
  children?: React.ReactElement | null
  backType?: string
}

const NavigationElement: FC<INavigationElement> = ({
  disabled = false,
  onClick,
  sx = {},
  children,
  direction,
  backType = '',
}): React.ReactElement => {
  const buttonSx = useMemo(() => getButtonSx(sx, disabled), [sx, disabled])
  const translate = useTranslate()
  const directionType = direction === 'prev' ? translate('btn_group_back') : translate(backType)

  return (
    <>
      <Button
        variant='outlined'
        sx={buttonSx}
        onClick={onClick}
      >
        {directionType.split(' ').map((el, index) => (
          <span key={index}>{el}</span>
        ))}

        {backType === BtnType.coding && <ArrowForwardIosIcon />}
      </Button>
      {children}
    </>
  )
}

const getButtonSx = (sx: SxProps, isDisabled: boolean): SxProps => ({
  fontSize: '1rem',
  display: 'flex',
  gap: 2,
  textTransform: 'capitalize',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  border: 'none! important',
  whiteSpace: 'nowrap',
  pointerEvents: isDisabled ? 'none' : 'auto',
  '&:hover': {
    border: 'none! important',
    backgroundColor: 'none',
    opacity: 0.7,
  },
  ...sx,
})

export default NavigationElement
