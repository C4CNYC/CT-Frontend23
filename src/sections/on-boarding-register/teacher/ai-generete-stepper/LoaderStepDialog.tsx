import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/system/Stack'

import LoaderStep from './LoaderStep'

export type ILoaderStepDialogProps = {
  open: boolean
  close: () => void
}

export function LoaderStepDialog({
  open,
  close,
}: ILoaderStepDialogProps): React.ReactElement | null {
  return open ? (
    <Dialog
      open={open}
      fullWidth
      maxWidth='md'
      onClose={close}
    >
      <DialogContent sx={{ p: 2 }}>
        <Stack
          position='relative'
          width='100%'
        >
          <LoaderStep isLoading={true} />
        </Stack>
      </DialogContent>
    </Dialog>
  ) : null
}
