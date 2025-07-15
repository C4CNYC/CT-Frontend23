import { Stack } from '@mui/material'

import { AiGenerateStepperProvider } from './AiGenerateStepperContext'
import AIGenerateStepperInside from './AIGenerateStepperInside'
import { AIGenerateStepperProps } from './constants'

export default function AIGenerateStepper({
  passedValues,
  props,
  isModal,
  closeModal,
}: AIGenerateStepperProps): React.ReactElement {
  return (
    <Stack
      position='relative'
      width='100%'
    >
      <AiGenerateStepperProvider
        isModal={isModal || false}
        closeModal={closeModal ?? (() => {})}
        initialStep={props?.activeStep || 0}
      >
        <AIGenerateStepperInside />
      </AiGenerateStepperProvider>
    </Stack>
  )
}
