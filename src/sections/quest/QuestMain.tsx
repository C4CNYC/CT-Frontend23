import { Avatar, Stack, Tooltip, Typography } from '@mui/material'

import { IStudent, IUser } from '@/redux/services/interfaces/user.interface'
import { TOOLTIP_TEXT } from '@/sections/main/quests/add-quest/constants'
import { BaseListResponseInterface, BaseResponseInterface } from '@/utils'
import { useTranslate } from '@/utils/translateHelper'

interface IQuestMainProps {
  mentor?: IStudent & BaseResponseInterface
  teachers?: BaseListResponseInterface<IUser & BaseResponseInterface>
  questName?: string
}
export default function QuestMain({
  mentor,
  teachers,
  questName,
}: IQuestMainProps): React.ReactElement {
  const translate = useTranslate()

  return (
    <Stack sx={{ mt: 3 }}>
      <Stack sx={{ gap: 1, alignItems: 'baseline', flexDirection: 'row', mb: 1 }}>
        <Typography variant='h5'>{translate('quest')}</Typography>
        <Tooltip title={<Typography variant='body2'>{TOOLTIP_TEXT}</Typography>}>
          <Typography
            variant='body2'
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {translate('quest_whats_quest')}
          </Typography>
        </Tooltip>
      </Stack>
      <Typography variant='h2'>{questName}</Typography>
      <Typography variant='h4'>{translate('teachers')}: </Typography>

      {teachers?.data.map((teacher) => (
        <Stack
          key={teacher.id}
          sx={{ ml: 1, mt: 1, flexDirection: 'row', gap: 1 }}
        >
          <Avatar
            src={teacher?.avatar ?? ''}
            alt={teacher?.first_name ?? ''}
            sx={{
              width: '30px',
              height: '30px',
              border: '2px solid #5D6C75',
              background: '#260236',
            }}
          >
            {teacher?.avatar ?? '🦙'}
          </Avatar>

          <Typography variant='h5'>
            {teacher?.first_name} {teacher?.last_name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
