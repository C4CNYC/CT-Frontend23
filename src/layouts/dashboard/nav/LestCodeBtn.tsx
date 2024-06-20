import { useMemo } from 'react'

import { Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { Iconify } from '@/components/iconify'
import { useGetAssignmentListStudentQuery } from '@/redux/services/manager/assignments-student'
import { useTranslate } from '@/utils/translateHelper'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'

import { getLetsCodeBtnSx } from './constants'

interface ILetsCodeBtnProps {
  isMini?: boolean
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const translate = useTranslate()
  const { push, query } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const letsCodeBtnSx = useMemo(() => getLetsCodeBtnSx(theme, isMini), [theme, isMini])
  const profile = useSelector((state) => state.global.user)
  const { data: assigments } = useGetAssignmentListStudentQuery(
    { class_id: query.id as string },
    { skip: !query.id || !profile }
  )

  return (
    <Button
      onClick={() => {
        // Now go to first quest
        if (!assigments?.data[0]) {
          enqueueSnackbar('No lesson to code', { variant: 'warning' })
        } else {
          push(
            STUDENT_PATH_DASHBOARD.codePanel.workSpace({
              courseId: assigments?.data[0].courseid,
            })
          )
        }
      }}
      variant='contained'
      sx={letsCodeBtnSx}
    >
      {!isMini ? `👩‍💻 ${translate('sidebar_menu_code_btn')}` : ''}

      {isMini ? (
        <Iconify
          icon='mingcute:code-fill'
          width={25}
          height={25}
        />
      ) : (
        <Iconify
          icon='octicon:chevron-right-12'
          width={25}
          height={25}
        />
      )}
    </Button>
  )
}
