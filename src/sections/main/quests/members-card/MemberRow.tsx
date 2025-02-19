import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Avatar, Checkbox, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import { useRouter } from 'next/router'

import RoleBasedGuard from '@/auth/RoleBasedGuard'
import { ConfirmDialog, MenuPopover, useSnackbar } from '@/components'
import { Role } from '@/redux/services/enums/role.enum'
import { IStudent } from '@/redux/services/interfaces/user.interface'
import { useUpdateClassPendingMutation } from '@/redux/services/manager/students-manager'
import { useTranslate } from '@/utils/translateHelper'
interface IMemberRowProps {
  row: IStudent
  selected: boolean
  loading?: boolean
  onEditRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
  pending: boolean
}

export default function MemberRow({
  row,
  selected,
  loading,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  pending,
}: IMemberRowProps): React.ReactElement | null {
  const { query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { first_name: firstName, last_name: lastName, avatar, username, city } = row
  const translate = useTranslate()
  const [openConfirm, setOpenConfirm] = useState(false)

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const [approvePending, { isLoading }] = useUpdateClassPendingMutation()

  const handleApprovePending = async () => {
    try {
      await approvePending({
        classId: query.id as string,
        student_id: row.id as string,
      }).unwrap()
      enqueueSnackbar(translate('members_approved_msg'))
    } catch (error: any) {
      enqueueSnackbar(error.data.message, { variant: 'error' })
    }
  }

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

  useEffect(() => {
    if (!loading) {
      handleCloseConfirm()
    }
  }, [loading])
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
        <TableCell>
          <Stack
            direction='row'
            alignItems='center'
          >
            <Avatar
              alt={firstName}
              src={avatar}
            />
          </Stack>
        </TableCell>
        <TableCell align='left'>
          {firstName && firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}
        </TableCell>

        <TableCell align='left'>
          {lastName && lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
        </TableCell>

        <TableCell align='left'>{username}</TableCell>

        {!pending ? (
          <TableCell align='left'>{city ?? '-'}</TableCell>
        ) : (
          <TableCell align='left'>
            <LoadingButton
              onClick={handleApprovePending}
              loading={isLoading}
              variant='contained'
            >
              {translate('actions_approve')}
            </LoadingButton>
          </TableCell>
        )}

        <TableCell align='right'>
          <RoleBasedGuard roles={[Role.Manager, Role.SuperAdmin, Role.Admin, Role.Owner]}>
            <IconButton
              color={openPopover ? 'inherit' : 'default'}
              onClick={handleOpenPopover}
            >
              <CgMoreVerticalAlt />
            </IconButton>
          </RoleBasedGuard>
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
          <FiTrash2 />
          {translate('actions_delete')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow()
            handleClosePopover()
          }}
        >
          <GoPencil />
          {translate('actions_edit')}
        </MenuItem>
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
