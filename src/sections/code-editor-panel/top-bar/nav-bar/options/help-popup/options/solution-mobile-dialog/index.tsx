import { type FC } from 'react'

// import { CopyBlock, dracula } from "react-code-blocks";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { AiOutlineCode } from '@react-icons/all-files/ai/AiOutlineCode'

import { Iconify } from '@/components/iconify'
import { useTranslate } from '@/lib/utils/translateHelper'
import { useSelector } from '@/redux/store'

import {
  COPY_BLOCK_CUSTOM_STYLES,
  DIALOG_CONTENT_SX,
  DIALOG_PAPER_PROPS,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_TYP_SX,
  ICON_BUTTON_SX,
} from './constants'

interface SolutionMobileDialogProps {
  open: boolean
  onClose: () => void
}

export const SolutionMobileDialog: FC<SolutionMobileDialogProps> = ({ open, onClose }) => {
  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)
  const translate = useTranslate()

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll='paper'
        PaperProps={DIALOG_PAPER_PROPS}
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
            <Iconify
              width='20px'
              icon='ic:round-close'
            />
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
            {solutionCode || translate('no_solution')}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SolutionMobileDialog
