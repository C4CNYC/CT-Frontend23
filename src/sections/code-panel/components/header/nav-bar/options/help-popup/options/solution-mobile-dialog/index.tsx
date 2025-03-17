import { useMemo, useRef, type FC } from 'react'

import { html } from '@codemirror/lang-html'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { AiOutlineCode } from '@react-icons/all-files/ai/AiOutlineCode'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { dracula } from '@uiw/codemirror-theme-dracula'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'

import { useSelector } from '@/redux/store'
import { useTranslate } from '@/utils/translateHelper'

import {
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
  const editorRef = useRef(null)
  const theme = useTheme()
  const translate = useTranslate()

  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)
  const userCode = useSelector((state) => state.codePanelGlobal.code)

  const dialogPaperProps = useMemo(
    () => getDialogPaperProps(theme.palette.mode === 'dark'),
    [theme.palette.mode === 'dark']
  )

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll='body'
        fullWidth
        maxWidth='lg'
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

        <DialogContent>
          <Stack
            direction={'row'}
            pb={1}
          >
            {/* <Stack width={'50%'}>
              <Typography
                variant='h6'
                pl={1}
                gutterBottom
              >
                {translate('my_code_title')}
              </Typography>
              <CodeMirror
                ref={editorRef}
                value={userCode ?? ''}
                theme={dracula}
                height='100%'
                maxHeight='85vh'
                extensions={[html(), EditorView.lineWrapping]}
                editable={false}
              />
            </Stack> */}
            <Stack width={'100%'}>
              <Typography
                variant='h6'
                pl={1}
                gutterBottom
              >
                {translate('solution_code_title')}
              </Typography>
              <CodeMirror
                ref={editorRef}
                value={solutionCode ?? translate('no_solution')}
                theme={dracula}
                height='100%'
                maxHeight='85vh'
                extensions={[html(), EditorView.lineWrapping]}
                editable={false}
              />
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SolutionMobileDialog
