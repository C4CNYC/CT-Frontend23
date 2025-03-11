import { Button, Divider } from '@mui/material'
import { AiTwotoneEdit } from '@react-icons/all-files/ai/AiTwotoneEdit'
import { RiDeleteBin6Line } from '@react-icons/all-files/ri/RiDeleteBin6Line'

import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'
import { useTranslate } from '@root/src/utils/translateHelper'

import EditProjectDialog from './EditProjectDialog'

interface Props {
  openPopover: HTMLElement | null
  handleClosePopover: () => void
  handleOpenConfirm: () => void
}

export default function ElementMenu({
  openPopover,
  handleClosePopover,
  handleOpenConfirm,
}: Props): React.ReactElement {
  const translate = useTranslate()
  return (
    <MenuPopover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openPopover}
      onClose={handleClosePopover}
    >
      <EditProjectDialog>
        <Button
          color='primary'
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {translate('actions_edit')}
          <AiTwotoneEdit size='20px' />
        </Button>
      </EditProjectDialog>
      <Divider
        flexItem
        sx={{ my: 1 }}
      />
      <Button
        color='error'
        onClick={handleOpenConfirm}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {translate('actions_delete')}
        <RiDeleteBin6Line
          size='20px'
          style={{ marginLeft: '5px' }}
        />
      </Button>
    </MenuPopover>
  )
}
