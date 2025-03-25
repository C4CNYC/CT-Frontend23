import { type FC, useEffect, useState } from 'react'

import { IconButton, ListItem, ListItemButton, MenuList, Typography, useTheme } from '@mui/material'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { MdOutlineFlag } from '@react-icons/all-files/md/MdOutlineFlag'
import { SlClose } from '@react-icons/all-files/sl/SlClose'
import { useDispatch } from 'react-redux'

import { setIsActivateCompeated } from '@/redux/slices/checkers-animation'
import { MenuPopover } from '@root/src/components'
import { useTranslate } from '@root/src/utils/translateHelper'

import { LIST_ITEM_SX } from './constants'

interface CheckersItemButtonProps {
  active: boolean
  name: string
  isCheckedOnce: boolean
}

const CheckersItemButton: FC<CheckersItemButtonProps> = ({ active, name, isCheckedOnce }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const translate = useTranslate()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    setOpenPopover(event.currentTarget)
  }
  const handleClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenPopover(null)
  }

  const onSendFeedback = (event: React.MouseEvent<HTMLElement>) => {
    handleClosePopover(event)
    const feedbackMsg = (event.currentTarget as HTMLElement).dataset.key
    if (!feedbackMsg) return
    // @TODO...
  }

  useEffect(() => {
    if (isCheckedOnce) return
    if (!active) {
      dispatch(setIsActivateCompeated(true))
    }
  }, [active, dispatch, isCheckedOnce])

  return (
    <>
      <ListItem
        sx={LIST_ITEM_SX}
        secondaryAction={
          <IconButton
            edge='end'
            onClick={handleOpenPopover}
            sx={{ p: 1, color: '#fff' }}
          >
            <MdOutlineFlag size={20} />
          </IconButton>
        }
      >
        {active ? (
          <SlClose
            color='#F44336'
            style={{ minWidth: 16 }}
          />
        ) : (
          <IoMdCheckmarkCircleOutline
            color='#75CF6D'
            style={{ minWidth: 20 }}
          />
        )}
        <Typography fontSize={12}>{name}</Typography>
      </ListItem>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ p: 0 }}
        disabledArrow
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList
          sx={{
            minHeight: 72,
            ...theme.typography.body2,
            padding: theme.spacing(0, 0),
          }}
        >
          <ListItemButton
            onClick={onSendFeedback}
            data-key='💩 This test is not working.'
          >
            {translate('feedback_test_not_working')}
          </ListItemButton>
          <ListItemButton
            onClick={onSendFeedback}
            data-key='👎🏽 This test is not helpful.'
          >
            {translate('feedback_test_not_helpful')}
          </ListItemButton>
        </MenuList>
      </MenuPopover>
    </>
  )
}

export default CheckersItemButton
