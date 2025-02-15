import { Button } from '@mui/material'

import { Iconify } from '@/components/iconify'
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
            sx={{ mt: 1 }}
          >
            <Iconify
              mr='7px'
              icon='carbon:reset'
            />
            {translate('reset_code')}
          </Button>
        </ResetLessonConfirm>
      </BasePreference>
    </>
  )
}

export default ResetCode
