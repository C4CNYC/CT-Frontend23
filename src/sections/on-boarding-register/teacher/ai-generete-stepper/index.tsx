import { Stack } from '@mui/material'
import {
  AIGenerateStepperProps,
} from './constants'
import { AiGenerateStepperProvider } from './AiGenerateStepperContext'
import AIGenerateStepperInside from './AiGenerateStepper'

export default function AIGenerateStepper({
  passedValues,
  props,
}: AIGenerateStepperProps): React.ReactElement {

  return (
    <Stack position='relative' width='100%'>
      <AiGenerateStepperProvider initialStep={props?.activeStep || 0} >
        <AIGenerateStepperInside isModal={false} />
      </AiGenerateStepperProvider>
    </Stack>
  )
}
