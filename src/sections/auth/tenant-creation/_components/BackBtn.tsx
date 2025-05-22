import { Box, IconButton } from '@mui/material'
import { MdArrowBackIosNew } from '@react-icons/all-files/md/MdArrowBackIosNew'

import { useStepperContext } from '../stepper-context'

export default function BackBtn() {
  const { handleBack, isError, activeStep } = useStepperContext()

  if (activeStep === 0) return null

  return (
    <Box sx={{ position: 'absolute', top: 5, left: 5, right: 0, zIndex: 1 }}>
      <IconButton
        disabled={isError}
        onClick={handleBack}
      >
        <MdArrowBackIosNew />
      </IconButton>
    </Box>
  )
}
