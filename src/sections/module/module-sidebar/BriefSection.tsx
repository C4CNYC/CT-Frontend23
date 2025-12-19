import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { AiOutlineClockCircle } from '@react-icons/all-files/ai/AiOutlineClockCircle'
import { LuSchool } from '@react-icons/all-files/lu/LuSchool'
import { MdOutlinePlayLesson } from '@react-icons/all-files/md/MdOutlinePlayLesson'
import { SiLevelsdotfyi } from '@react-icons/all-files/si/SiLevelsdotfyi'

import { useTranslate } from '@/utils/translateHelper'
import { capitalizeFirstSymbol } from '@root/src/utils/capitalizeFirstSymbol'

interface IBriefSectionProps {
  duration: string
  level: string
  lessons: string
  grade: string
  brief: string
}

export default function BriefSection({
  duration,
  level,
  lessons,
  grade,
  brief,
}: IBriefSectionProps): React.ReactElement {
  const theme = useTheme()
  const translate = useTranslate()

  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: theme.palette.mode === 'light' ? '#F8F8F8' : theme.palette.background.paper,
        pb: 2,
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <AiOutlineClockCircle size={20} />
          </ListItemIcon>
          <ListItemText primary={duration} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SiLevelsdotfyi size={20} />
          </ListItemIcon>
          <ListItemText primary={capitalizeFirstSymbol(level)} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MdOutlinePlayLesson size={20} />
          </ListItemIcon>
          <ListItemText primary={lessons} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LuSchool size={20} />
          </ListItemIcon>
          <ListItemText primary={capitalizeFirstSymbol(grade)} />
        </ListItem>
      </List>
      <Box sx={{ px: 2 }}>
        {brief || (
          <>
            <Typography variant='body2'>{translate('courses_for_beginners_info')}</Typography>
            <Typography variant='body2'>{translate('courses_entry_point')}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
