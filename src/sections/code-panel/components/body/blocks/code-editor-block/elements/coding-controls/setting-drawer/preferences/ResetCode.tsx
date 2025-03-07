import { Button } from '@mui/material'
import { IoRefreshOutline } from '@react-icons/all-files/io5/IoRefreshOutline'

import BasePreference from './BasePreference'

interface IResetCode {
  onReset: () => void
}

const ResetCode = ({ onReset }: IResetCode): React.ReactElement => {
  return (
    <BasePreference title='reset code'>
      <Button
        onClick={onReset}
        fullWidth
        variant='contained'
      >
        <IoRefreshOutline style={{ marginRight: '7px' }} />
        Reset Lesson
      </Button>
    </BasePreference>
  )
}

export default ResetCode
