import React from 'react'

import { Box, Button, DialogActions, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useTranslate } from '@/utils/translateHelper'
import ModuleLessonsAutocomplete from '@root/src/components/module-lessons-autocomplete/ModuleLessonAutocomplete'

interface ICreateLessonDialogProps {
  moduleId: string
  isOpen: boolean
  handleClose: () => void
}

export default function InsertExisistingLessonModal({
  moduleId,
  isOpen,
  handleClose,
}: ICreateLessonDialogProps): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{ zIndex: 1300 }}
        PaperProps={{
          sx: {
            background: theme.palette.background.default,
          },
        }}
      >
        <DialogTitle>{translate('modules_add_lesson_modal')}</DialogTitle>
        <DialogContent
          sx={{
            pl: 2,
            pr: 2,
            minWidth: '390px',
            '@media (max-width:500px)': {
              minWidth: '100%',
              px: 1,
            },
          }}
        >
          <ModuleLessonsAutocomplete id={moduleId} />
          <DialogActions sx={{ mt: 30 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Button onClick={handleClose}>{translate('actions_close')}</Button>
            </Box>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
