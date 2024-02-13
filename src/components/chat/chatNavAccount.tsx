import { useState, useCallback } from 'react'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import Badge, { badgeClasses } from '@mui/material/Badge'

// import { useMockedUser } from 'src/hooks/use-mocked-user'

import { CiChat1 } from '@react-icons/all-files/ci/CiChat1'
import CustomPopover, { usePopover } from '../custom-popover'

// ----------------------------------------------------------------------

export default function ChatNavAccount() {
  //   const { user } = useMockedUser()

  const popover = usePopover()

  const [status, setStatus] = useState('online')

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value)
  }, [])

  return (
    <>
      <Badge
        variant='dot'
        color='primary'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            right: 6,
            bottom: 6,
          },
        }}
      >
        <Avatar
          src={
            'https://devnest.s3.amazonaws.com/tenant_f072bcf3-5957-4f04-97da-f8e4c4c53439/students/1d549244-d686-40f9-8e23-15f6efcb1a08/avatar_1704981148061_.png'
          }
          alt={'user'}
          onClick={popover.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        />
      </Badge>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow='top-left' sx={{ p: 0 }}>
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
          }}
        >
          <ListItemText
            primary={'user.displayName'}
            secondary={'user.email'}
            secondaryTypographyProps={{ component: 'span' }}
          />

          <Tooltip title='Log out'>
            <IconButton color='error'>
              <CiChat1 />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Badge
              variant='dot'
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  position: 'static',
                  m: 0.75,
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                },
              }}
            />

            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase sx={{ pl: 2 }} />}
              inputProps={{
                sx: { textTransform: 'capitalize' },
              }}
            >
              {['online', 'alway', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem>
            <CiChat1 />
            Profile
          </MenuItem>

          <MenuItem>
            <CiChat1 />
            Settings
          </MenuItem>
        </Stack>
      </CustomPopover>
    </>
  )
}
