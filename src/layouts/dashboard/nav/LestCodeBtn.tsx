import { useMemo } from 'react'

import { Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { useRouter } from 'next/router'

import { Iconify } from '@/components/iconify'
import { useGetAssignmentListStudentQuery } from '@/redux/services/manager/assignments-student'
import { useSelector } from '@/redux/store'
import { STUDENT_PATH_DASHBOARD } from '@/routes/student.paths'
import { useTranslate } from '@/utils/translateHelper'
import {
  useGetCourseQuery,
  useGetStudentCourseModulesQuery,
} from '@root/src/redux/services/manager/courses-student'

import { getLetsCodeBtnSx } from './constants'

interface ILetsCodeBtnProps {
  isMini?: boolean
}

export default function LetsCodeBtn({ isMini }: ILetsCodeBtnProps) {
  const translate = useTranslate()
  const { push, query } = useRouter()
  const theme = useTheme()
  const letsCodeBtnSx = useMemo(() => getLetsCodeBtnSx(theme, isMini), [theme, isMini])
  const profile = useSelector((state) => state.global.user)
  const lessonId = useSelector((state) => state.codePanelGlobal.lessonId)
  const courseId = useSelector((state) => state.codePanelGlobal.courseId)
  const unitId = useSelector((state) => state.codePanelGlobal.unitId)
  const { data: assigments } = useGetAssignmentListStudentQuery(
    { class_id: query.id as string },
    { skip: !query.id || !profile }
  )
  const { data: course, isLoading: isLoadingCourse } = useGetCourseQuery({}, { skip: !profile })
  let courseDataId = course && course.data && course.data.length ? course.data[0].id : ''
  const { data: module, isLoading: isLoadingModule } = useGetStudentCourseModulesQuery(
    { id: courseDataId as string },
    { skip: !courseDataId || isLoadingCourse || !profile }
  )

  const getLetsCodeLesson = () => {
    if (courseId && unitId && lessonId) {
      push(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId,
          unitId,
          lessonId,
        })
      )
    } else if (assigments?.data[0]) {
      push(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: assigments?.data[0].courseid,
        })
      )
    } else {
      push(
        STUDENT_PATH_DASHBOARD.codePanel.workSpace({
          courseId: course?.data[0].id as string,
          unitId: module?.[0].id as string,
        })
      )
    }
  }

  return (
    <Button
      onClick={getLetsCodeLesson}
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
