import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { CgMoreVerticalAlt } from '@react-icons/all-files/cg/CgMoreVerticalAlt'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { GoPencil } from '@react-icons/all-files/go/GoPencil'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { LuClock3 } from '@react-icons/all-files/lu/LuClock3'
import NextLink from 'next/link'

import { SOCIAL_ICONS } from '@/assets/data'
import { Role } from '@/redux/services/enums/role.enum'
import { IStudent, IUser } from '@/redux/services/interfaces/user.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { useTranslate } from '@/utils/translateHelper'
import { ConfirmDialog } from '@root/src/components/confirm-dialog/ConfirmDialog'
import { RoleSelector } from '@root/src/components/drop-down-menu'
import { Label } from '@root/src/components/label/Label'
import { MenuPopover } from '@root/src/components/menu-popover/MenuPopover'

interface Props {
  row: (IUser | IStudent) & BaseResponseInterface
  selected: boolean
  loading?: boolean
  onEditRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function UserTableRow({
  row,
  selected,
  loading,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props): React.ReactElement | null {
  const {
    email,
    first_name: firstName,
    last_name: lastName,
    verified,
    active,
    avatar,
    role,
    id,
    socials,
    account,
  } = row
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
        <TableCell>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
          >
            <Avatar
              alt={firstName}
              src={avatar ?? account?.avatar}
            />
          </Stack>
        </TableCell>

        <TableCell align='left'>{email || account?.email}</TableCell>

        <TableCell align='left'>
          {firstName && firstName?.charAt(0).toUpperCase() + firstName?.slice(1)}
        </TableCell>

        <TableCell align='left'>
          {lastName && lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}
        </TableCell>

        {role ? (
          <TableCell
            align='left'
            sx={{ textTransform: 'capitalize' }}
          >
            <RoleSelector
              userId={id}
              role={role as Role}
              email={email}
            />
          </TableCell>
        ) : null}

        {!role ? (
          <TableCell align='left'>
            <Stack
              direction='row'
              sx={{ maxWidth: '145px', flexWrap: 'wrap', gap: 1 }}
            >
              {socials?.map((link) => (
                <Tooltip
                  key={link.link}
                  title={<Typography variant='body2'>{link.link}</Typography>}
                >
                  <Box
                    key={link.name}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <Link
                      sx={{
                        color: '#fff',
                        '> svg': {
                          width: '20px',
                          height: '20px',
                        },
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                      component={NextLink}
                      href={link.link}
                      variant='body2'
                      color='text.primary'
                      target='_blank'
                    >
                      {SOCIAL_ICONS[link.type]}
                    </Link>
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          </TableCell>
        ) : null}

        <TableCell align='center'>
          {verified ? (
            <IoMdCheckmarkCircleOutline
              color={!verified ? 'warning.main' : 'success.main'}
              size={20}
            />
          ) : (
            <LuClock3
              color={!verified ? 'warning.main' : 'success.main'}
              size={20}
            />
          )}
        </TableCell>

        <TableCell align='left'>
          <Label
            variant='soft'
            color={active ? 'success' : 'warning'}
            sx={{ textTransform: 'capitalize' }}
          >
            {active ? translate('active') : translate('not_active')}
          </Label>
        </TableCell>

        <TableCell align='right'>
          <IconButton
            color={openPopover ? 'inherit' : 'default'}
            onClick={handleOpenPopover}
          >
            <CgMoreVerticalAlt />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow={'right-top'}
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
