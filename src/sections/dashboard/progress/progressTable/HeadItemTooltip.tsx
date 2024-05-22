import { Typography } from '@mui/material'
import { format } from 'date-fns'

import {
  IClassProgressCourse,
  IClassProgressModule,
} from '@root/src/redux/interfaces/class.interface'
import { useTranslate } from '@root/src/utils/translateHelper'

interface IHeadItemTooltip {
  levelName: 'lesson' | 'module' | 'course'
  selectedCourseIdx: number
  item: IClassProgressCourse | IClassProgressModule
  courses: IClassProgressCourse[]
  index: number
}

export default function HeadItemTooltip({
  levelName,
  selectedCourseIdx,
  item,
  courses,
  index,
}: IHeadItemTooltip) {
  const translate = useTranslate()
  return (
    <>
      <Typography variant='body2'>
        {levelName.toUpperCase()} <br />
        {translate('project')}{' '}
        {'content_id' in item
          ? item.content_id
          : `${courses[selectedCourseIdx]?.content_id}.${index + 1}`}
      </Typography>
      <Typography variant='h6'>{item.name}</Typography>
      <Typography variant='body2'>
        <div
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 6,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item?.description}
        </div>
        {'due_date' in item && (
          <>
            <br />
            {translate('due')}: {format(new Date(item?.due_date), 'dd LLL, yyyy')}
          </>
        )}
        <br />
        {item.autoGraded ? 'Auto-graded' : 'Manual graded'} |{' '}
        {item.core ? 'Core Curriculum' : 'School Curriculum'}
      </Typography>
    </>
  )
}
