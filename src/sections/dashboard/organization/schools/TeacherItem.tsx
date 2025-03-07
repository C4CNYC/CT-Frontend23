import { useState } from 'react'

import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { FiTrash2 } from '@react-icons/all-files/fi/FiTrash2'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'

import { IUser } from '@/redux/services/interfaces/user.interface'
import { BaseResponseInterface } from '@/utils/baseResponse.interface'
import { MenuPopover } from '@root/src/components'
interface Props {
  person: IUser & BaseResponseInterface
  handleDeleteTeacher: () => void
}

export default function TeacherItem({
  person,
  handleDeleteTeacher,
}: Props): React.ReactElement | null {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(null)
  }

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar
            alt={person.first_name}
            src='/assets/images/avatar_2.jpg'
          />
        </ListItemAvatar>

        <ListItemText
          primary={`${person.first_name ?? ''} ${person.last_name ?? ''}`}
          secondary={
            <Tooltip title={person.email}>
              <span>{person.email}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size='small'
          color='inherit'
          endIcon={<IoIosArrowDown />}
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: 'unset',
            fontWeight: 'fontWeightMedium',
            '& .MuiButton-endIcon': {
              ml: 0,
            },
            ...(openPopover && {
              bgcolor: 'action.selected',
            }),
          }}
        ></Button>
      </ListItem>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        <>
          <MenuItem
            onClick={() => {
              handleDeleteTeacher()
              handleClosePopover()
            }}
            sx={{ color: 'error.main' }}
          >
            <FiTrash2 />
            Remove
          </MenuItem>
        </>
      </MenuPopover>
    </>
  )
}
