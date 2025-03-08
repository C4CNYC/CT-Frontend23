import { useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { IconButton, Stack, Typography, alpha } from '@mui/material'
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline'
import { MdOutlineModeEdit } from '@react-icons/all-files/md/MdOutlineModeEdit'
import { useSnackbar } from 'notistack'

import { ConfirmDialog } from '@/components'
import { APIError } from '@/redux/interfaces/custom-error.interface'
import { IGoals } from '@/redux/interfaces/goals.interface'
import { useRemoveGoalMutation } from '@/redux/services/manager/goals-student'
import { useTranslate } from '@/utils/translateHelper'

import AddEditNoteDialog from './AddEditGoalDialog'
interface INotesItemProps {
  note: IGoals
}
export default function NotesItem({ note }: INotesItemProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [deleteNote, { isLoading }] = useRemoveGoalMutation()
  const translate = useTranslate()
  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }
  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleDelete = async () => {
    try {
      await deleteNote({ id: note.id as string }).unwrap()
      enqueueSnackbar(translate('messages_deleted'))
    } catch (error: any) {
      const typedError = error as APIError
      enqueueSnackbar(typedError.data.message, {
        variant: 'error',
      })
    }
    handleCloseConfirm()
  }

  return (
    <>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 2,
          borderRadius: 4,
          border: `3px solid ${note.color}`,
          background: alpha(note.color, 0.5),
        }}
      >
        <Stack>
          <Typography
            sx={{ px: 3 }}
            variant='h6'
          >
            {note.title}
          </Typography>

          <Typography
            sx={{ px: 3 }}
            variant='body1'
          >
            {note.description}
          </Typography>
        </Stack>

        <Stack sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1 }}>
          <AddEditNoteDialog note={note}>
            <IconButton
              sx={{
                background: '#fff',
                '&:hover': {
                  background: '#fff',
                },
              }}
            >
              <MdOutlineModeEdit size={22} />
            </IconButton>
          </AddEditNoteDialog>
          <IconButton
            sx={{
              color: 'error.main',
              background: '#fff',
              '&:hover': {
                background: '#fff',
              },
            }}
            onClick={handleOpenConfirm}
          >
            <IoTrashOutline size={22} />
          </IconButton>
        </Stack>
      </Stack>
      <ConfirmDialog
        onClose={handleCloseConfirm}
        open={openConfirm}
        title={translate('actions_delete')}
        content={<Typography>{translate('notes_delete_question')}</Typography>}
        action={
          <LoadingButton
            loading={isLoading}
            variant='contained'
            color='error'
            onClick={handleDelete}
          >
            {translate('actions_delete')}
          </LoadingButton>
        }
      />
    </>
  )
}
