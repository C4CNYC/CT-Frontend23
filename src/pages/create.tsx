import { useEffect, useRef, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { useBoolean } from '../hooks/useBoolean'
import AIGenerateStepper from '../sections/on-boarding-register/teacher/ai-generete-stepper'

export default function AiGeneratePage(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prompt, promptSet] = useState('')
  const [open, setOpen, setClose] = useBoolean(false)
  useEffect(() => {
    if (containerRef.current) {
      // Query the injected HTML to find the field
      const elPropmt = containerRef.current.querySelector('#prompt') as HTMLInputElement
      const elGenerate = containerRef.current.querySelector('#generate') as HTMLButtonElement
      if (elPropmt && elGenerate) {
        elPropmt.onchange = (e) => {
          let t = e.target as HTMLInputElement
          promptSet(t?.value)
        }
        elGenerate.onclick = setOpen
      }
    }
  }, [])

  // TODO - Add request to /org/:id/home-page to get the home page body
  // if home_page_type === 'authorization' then redirect to /sign-up
  // if home_page_type === 'custom' then render the home_page_body
  // if home_page_type === 'default' then redirect to /sign-up

  return (
    <>
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: '' }}
      ></div>

      <Dialog
        open={open}
        fullWidth
        maxWidth='md'
        onClose={setClose}
      >
        <DialogContent sx={{ p: 2 }}>
          <AIGenerateStepper
            isModal
            closeModal={setClose}
            passedValues={{ RpromptR: prompt }}
            props={{ activeStep: 1 }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
