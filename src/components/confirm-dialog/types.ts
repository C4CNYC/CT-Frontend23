import { DialogProps } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
export interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
  title: React.ReactNode | null
  content?: React.ReactNode | null
  action: React.ReactNode | null
  open: boolean
  actionsProps?: SxProps<Theme>
  onClose: (event: React.MouseEvent<HTMLElement>) => void
}
