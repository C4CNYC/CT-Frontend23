import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  Stack,
  TextField,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

import { Scrollbar } from '@/components'
import { useFilters } from '@/hooks'
import {
  useCreateOrgMemberMutation,
  useGetOrgMembersQuery,
} from '@/redux/services/admin/members-admin'
import { useAddTeacherMutation } from '@/redux/services/admin/school-amdin'
import { useCreateInviteTeacherToSchoolMutation } from '@/redux/services/manager/invite-system'
import { useTranslate } from '@/utils/translateHelper'

import { RootState } from '../../../../redux/store'
import { PATH_MAIN } from '../../../../routes/paths'

import UserItem from './UserItem'

interface Props extends DialogProps {
  teachersIds: string[]
  schoolId: string
  inviteEmail: string
  onClose: VoidFunction
}

export default function InviteTeacherDialog({
  teachersIds = [],
  schoolId,
  inviteEmail,
  open,
  onClose,
  ...other
}: Props): React.ReactElement | null {
  const [addTeacher] = useAddTeacherMutation()
  const [inviteTeacherToSchool] = useCreateInviteTeacherToSchoolMutation()
  const [createUser] = useCreateOrgMemberMutation()
  const { enqueueSnackbar } = useSnackbar()
  const { filters, setFilter } = useFilters({ email: '' })
  const { data: members } = useGetOrgMembersQuery({ ...filters }, { skip: !filters.email })
  const translate = useTranslate()
  const currentUserId = useSelector((state: RootState) => state.global.user?.id)

  const addUserToSchool = async (user_email: string, schoolId: string): Promise<void> => {
    try {
      if (!currentUserId) return

      await inviteTeacherToSchool({
        createdBy: currentUserId,
        email: user_email,
        schoolId,
        redirectUrl: PATH_MAIN.index,
      }).unwrap()
      enqueueSnackbar(translate('messages_invite_sent'))
    } catch (e: any) {
      enqueueSnackbar(e.data.message, { variant: 'error' })
    }
  }

  const onSendInvite = async (): Promise<void> => {
    try {
      if (!currentUserId) return

      await inviteTeacherToSchool({
        createdBy: currentUserId,
        email: filters.email,
        schoolId,
        redirectUrl: PATH_MAIN.index,
      }).unwrap()
      enqueueSnackbar(translate('messages_invite_sent'))

      setFilter('email', '')
      onClose()
    } catch (e: any) {
      enqueueSnackbar(e.data.message, { variant: 'error' })
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle> {translate('invite')} </DialogTitle>
      <DialogContent sx={{ overflow: 'unset' }}>
        <>
          <Stack
            direction='row'
            spacing={1}
            sx={{ mb: 3 }}
          >
            <TextField
              fullWidth
              size='small'
              value={filters.email}
              placeholder={translate('email')}
              onChange={(e: any) => {
                setFilter('email', e.target.value)
              }}
            />
            <Button
              variant='contained'
              disabled={!!members?.data.length || !filters.email}
              onClick={onSendInvite}
            >
              {translate('members_send_invite')}
            </Button>
          </Stack>

          {members && (
            <Scrollbar sx={{ maxHeight: 60 * 6 }}>
              <List disablePadding>
                {members.data.map((person) => (
                  <UserItem
                    addHandler={async () => {
                      await addUserToSchool(person.email, schoolId)
                    }}
                    invited={teachersIds.includes(person.id)}
                    key={person.id}
                    person={person}
                  />
                ))}
              </List>
            </Scrollbar>
          )}
        </>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-end' }}>
        {onClose && (
          <Button
            variant='outlined'
            color='inherit'
            onClick={onClose}
          >
            {translate('actions_close')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
