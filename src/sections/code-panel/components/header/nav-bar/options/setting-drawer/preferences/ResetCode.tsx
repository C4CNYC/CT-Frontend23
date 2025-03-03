import { Button } from '@mui/material'
import { GrPowerReset } from '@react-icons/all-files/gr/GrPowerReset'

import { useTranslate } from '@/utils/translateHelper'

import BasePreference from './BasePreference'
import ResetLessonConfirm from './ResetLessonConfirm'

const ResetCode = (): React.ReactElement => {
  const translate = useTranslate()

  return (
    <>
      <BasePreference title={translate('reset_lesson')}>
        <ResetLessonConfirm>
          <Button
            fullWidth
            variant='contained'
            sx={{ gap: 1 }}
          >
            <GrPowerReset size={18} />
            {translate('reset_code')}
          </Button>
        </ResetLessonConfirm>
      </BasePreference>
    </>
  )
}

export default ResetCode
