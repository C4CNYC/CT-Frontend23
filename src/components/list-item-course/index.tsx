import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { IoMdCheckmarkCircleOutline } from '@react-icons/all-files/io/IoMdCheckmarkCircleOutline'
import { IoLockClosed } from '@react-icons/all-files/io5/IoLockClosed'
import { IoPlayCircleOutline } from '@react-icons/all-files/io5/IoPlayCircleOutline'

import { ILesson } from '@/redux/interfaces/content.interface'
export enum LessonStatus {
  DONE = 'done',
  READY = 'ready',
  LOCK = 'lock',
}

interface Prop {
  lessons: ILesson
  onClick: () => void
  status: LessonStatus
}

const statusIcons = {
  [LessonStatus.DONE]: <IoMdCheckmarkCircleOutline />,
  [LessonStatus.LOCK]: <IoLockClosed />,
  [LessonStatus.READY]: <IoPlayCircleOutline />,
}

export default function ListItemCourse({ lessons, status, onClick }: Prop): React.ReactElement {
  return (
    <ListItem
      sx={{
        width: '500px',
        bgcolor: 'background.paper',
      }}
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          backgroundColor: '#f6f7f9',
          '&:hover': {
            bgcolor: '#dee2e7',
          },
        }}
      >
        <ListItemIcon
          sx={{
            width: '34px',
            padding: '3px',
            border: '1px solid #e5e8eb',
            borderRadius: 2,
            backgroundColor: '#e5e8eb',
          }}
        >
          {statusIcons[status]}
        </ListItemIcon>
        <ListItemText>
          <Typography
            color='#5a626b'
            variant='subtitle1'
          >
            {lessons.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
