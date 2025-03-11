import { useState } from 'react'

import { Avatar, Button, Divider, IconButton, MenuItem, TableCell, TableRow } from '@mui/material'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import { enqueueSnackbar } from 'notistack'

import { useArchiveSchoolMutation } from '@/redux/services/admin/school-amdin'
import { ISchoolSummary } from '@/redux/services/interfaces/school.interface'
import { useTranslate } from '@/utils/translateHelper'
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { Label } from '@root/src/components/label/Label'
import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'

import SchoolDetailsDrawer from '../portal/SchoolDetailsDrawer'

interface Props {
  row: ISchoolSummary
}

export default function SchoolTableRow({ row }: Props): React.ReactElement {
  const translate = useTranslate()
  const [archive] = useArchiveSchoolMutation()

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false)
  }

  const handleOpenDetails = (): void => {
    setOpenDetails(true)
  }

  const handleCloseDetails = (): void => {
    setOpenDetails(false)
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget)
    event.stopPropagation()
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  const archiveSchool = async () => {
    try {
      await archive({
        schoolId: row?.id as string,
      }).unwrap()
      setOpenConfirm(false)
      enqueueSnackbar('School is archived')
    } catch (e: any) {
      enqueueSnackbar(e.data.message, {
        variant: 'error',
      })
    }
  }
  return (
    <TableRow>
      <TableCell>
        {row.cover ? (
          <Avatar
            sx={{ width: '30px', height: '30px' }}
            alt={row.name as string}
            src={row.cover ?? '/assets/icons/shool/school-icon.svg'}
          ></Avatar>
        ) : (
          <Avatar
            variant='square'
            sx={{ width: '30px', height: '30px' }}
            alt={row.name as string}
            src={row.cover ?? '/assets/icons/shool/school-icon.svg'}
          ></Avatar>
        )}
      </TableCell>
      <TableCell
        padding='checkbox'
        align='left'
      >
        {row.name}
      </TableCell>
      <TableCell align='center'>{row.country}</TableCell>
      <TableCell align='left'>{row.city}</TableCell>
      <TableCell align='left'>{row.phone}</TableCell>
      <TableCell align='left'>
        <Label
          variant='soft'
          color={row.active ? 'success' : 'warning'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row.active ? translate('active') : translate('not_active')}
        </Label>
      </TableCell>
      <TableCell
        padding='checkbox'
        align='left'
      >
        <IconButton onClick={handleOpenPopover}>
          <BiDotsVerticalRounded size={23} />
        </IconButton>
      </TableCell>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow={'right-top'}
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDetails()
            handleClosePopover()
          }}
        >
          <>
            <GoPencil />
            {translate('actions_edit')}
          </>
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            handleOpenConfirm()
            handleClosePopover()
          }}
          sx={{ color: 'error.main' }}
        >
          <FiTrash2 />
          {translate('actions_archive')}
        </MenuItem>
      </MenuPopover>

      <SchoolDetailsDrawer
        item={row}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails()
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate('actions_archive')}
        content={translate('messages_archive_question')}
        action={
          <Button
            variant='contained'
            color='error'
            onClick={archiveSchool}
          >
            {translate('actions_archive')}
          </Button>
        }
      />
    </TableRow>
  )
}
