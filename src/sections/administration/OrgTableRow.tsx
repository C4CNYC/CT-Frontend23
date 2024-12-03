import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Avatar, Checkbox, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material'

import { ConfirmDialog, Iconify, MenuPopover } from '@/components'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { IAdministration } from '@root/src/redux/services/interfaces/administration'

import AddEditOrgModal from './AddEditOrgModal'

interface Props {
  row: IAdministration & BaseResponseInterface
  selected: boolean
  loading?: boolean
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function OrgTableRow({
  row,
  selected,
  loading,
  onSelectRow,
  onDeleteRow,
}: Props): React.ReactElement | null {
  const { name, slug, logo, min_logo, favicon, home_page_type } = row
  const [openConfirm, setOpenConfirm] = useState(false)

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const translate = useTranslate()

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  return (
    <>
      <TableRow
        hover
        selected={selected}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
          />
        </TableCell>
        <TableCell align='center'>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              alt={'logo'}
              src={logo ?? ''}
            />
          </Stack>
        </TableCell>
        <TableCell>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              alt={'min_logo'}
              src={min_logo ?? ''}
            />
          </Stack>
        </TableCell>

        <TableCell>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              alt={'org_favicon'}
              src={favicon ?? ''}
            />
          </Stack>
        </TableCell>

        <TableCell align='center'>{name}</TableCell>

        <TableCell align='center'>{slug}</TableCell>

        <TableCell align='center'>{home_page_type}</TableCell>

        <TableCell align='right'>
          <IconButton
            color={openPopover ? 'inherit' : 'default'}
            onClick={handleOpenPopover}
          >
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-top'
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm()
            handleClosePopover()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon='eva:trash-2-outline' />
          {translate('actions_delete')}
        </MenuItem>

        <AddEditOrgModal org={row}>
          <MenuItem>
            <Iconify icon='eva:edit-fill' />
            {translate('actions_edit')}
          </MenuItem>
        </AddEditOrgModal>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('actions_delete')}
        content={translate('messages_delete_question')}
        action={
          <LoadingButton
            variant='contained'
            color='error'
            onClick={onDeleteRow}
            loading={loading}
          >
            {translate('actions_delete')}
          </LoadingButton>
        }
      />
    </>
  )
}
