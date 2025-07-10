import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material'

import { IAuthor } from '@/redux/services/interfaces/author.interface'
import { useTranslate } from '@/utils/translateHelper'

import AuthorForm from './AuthorForm'

interface IAddAuthorDialogProps {
  children: React.ReactElement
  moduleId: string
  defaultValues?: IAuthor
}

export default function AddAuthorDialog({
  children,
  moduleId,
  defaultValues,
}: IAddAuthorDialogProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false)
  const translate = useTranslate()

  const handleOpenDialog = (): void => {
    setOpen(true)
  }
  const handleCloseDialog = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{ display: 'flex' }}
        onClick={handleOpenDialog}
      >
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            height: '800px',
            width: { xs: '330px', sm: '350px', md: '450px' },
          },
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <DialogTitle variant='h5'>{translate('actions_create_author')}</DialogTitle>
          <IconButton
            onClick={handleCloseDialog}
            sx={{ mr: 2 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <AuthorForm
          moduleId={moduleId}
          setFormVisible={handleCloseDialog}
          defaultValues={defaultValues}
          isEdit={Boolean(defaultValues)}
        />
      </Dialog>
    </>
  )
}
