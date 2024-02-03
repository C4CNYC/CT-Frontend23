import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { AiOutlineCode } from '@react-icons/all-files/ai/AiOutlineCode'
import { useAtom } from 'jotai'
// import { CopyBlock, dracula } from "react-code-blocks";

import { Iconify } from '@/components/iconify'
import { globalCodePanelAtom } from '@/sections/code-panel/atoms/global-code-panel.atom'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SolutionMobileDialog({ open, onClose }: Props): React.ReactElement {
  const [{ solutionCode }] = useAtom(globalCodePanelAtom)
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll='paper'
        PaperProps={{
          sx: {
            minWidth: {
              xs: 'calc(90% - 32px)',
              sm: '400px',
              md: '400px',
              lg: '450px',
            },
            height: {
              xs: '50vh',
              sm: '50vh',
              md: '450px',
              lg: '450px',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AiOutlineCode
            size='30px'
            color='#EE467A'
          />
          <Typography
            variant='h5'
            sx={{ flexGrow: 1, ml: 1, alignSelf: 'flex-end' }}
          >
            Solution
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ selfAlign: 'flex-end', mr: '-10px' }}
          >
            <Iconify
              width='20px'
              icon='ic:round-close'
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {/* <CopyBlock */}
          {/*   text={solutionCode || "NO SOLUTION"} */}
          {/*   language="html" */}
          {/*   theme={dracula} */}
          {/*   customStyle={{ */}
          {/*     height: "100%", */}
          {/*     width: "100%", */}
          {/*     overflowY: "visible", */}
          {/*     borderRadius: "0", */}
          {/*     boxShadow: "none", */}
          {/*     fontSize: "0.75rem", */}
          {/*   }} */}
          {/* /> */}
          <Box
            component='div'
            style={{
              height: '100%',
              width: '100%',
              overflowY: 'visible',
              borderRadius: '0',
              boxShadow: 'none',
              fontSize: '0.75rem',
            }}
          >
            {solutionCode || 'NO SOLUTION'}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
