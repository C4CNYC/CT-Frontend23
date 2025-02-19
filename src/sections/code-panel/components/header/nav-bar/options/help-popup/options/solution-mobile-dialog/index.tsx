import { useMemo, type FC } from 'react'

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { AiOutlineCode } from '@react-icons/all-files/ai/AiOutlineCode'
import { IoClose } from 'react-icons/io5'

import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'

import {
  COPY_BLOCK_CUSTOM_STYLES,
  DIALOG_CONTENT_SX,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_TYP_SX,
  getDialogPaperProps,
  ICON_BUTTON_SX,
} from './constants'

interface SolutionMobileDialogProps {
  open: boolean
  onClose: () => void
}

export const SolutionMobileDialog: FC<SolutionMobileDialogProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)
  const translate = useTranslate()
  const dialogPaperProps = useMemo(
    () => getDialogPaperProps(theme.palette.mode === 'dark'),
    [theme.palette.mode === 'dark']
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll='paper'
        PaperProps={dialogPaperProps}
      >
        <DialogTitle sx={DIALOG_TITLE_SX}>
          <AiOutlineCode
            size='30px'
            color='#EE467A'
          />

          <Typography
            variant='h5'
            sx={DIALOG_TITLE_TYP_SX}
          >
            {translate('solution')}
          </Typography>

          <IconButton
            onClick={onClose}
            sx={ICON_BUTTON_SX}
          >
            <IoClose />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={DIALOG_CONTENT_SX}>
          {/* <CopyBlock */}
          {/*   text={solutionCode || translate(NO_SOLUTION_TEXT)} */}
          {/*   language="html" */}
          {/*   theme={dracula} */}
          {/*   customStyle={COPY_BLOCK_CUSTOM_STYLES} */}
          {/* /> */}
          <Box
            component='div'
            style={COPY_BLOCK_CUSTOM_STYLES as any}
          >
            {solutionCode || <Typography>{translate('no_solution')}</Typography>}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SolutionMobileDialog
