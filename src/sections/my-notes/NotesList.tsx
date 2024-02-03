import { Card, CardHeader, CardProps, IconButton, Typography } from '@mui/material'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'

import { useTranslate } from '@/lib/utils/translateHelper'
import { IGoals } from '@/redux/interfaces/goals.interface'

import AddEditGoalDialog from './AddEditGoalDialog'
import { BUTTON_SX, CARD_SX } from './constants'
import NotesItem from './NotesItem'

interface INotesListProps extends CardProps {
  list: IGoals[]
}

export default function NotesList({ list }: INotesListProps) {
  const translate = useTranslate()

  return (
    <Card sx={CARD_SX}>
      <CardHeader title={<Typography variant='h5'>{translate('notes_my')}</Typography>} />
      <AddEditGoalDialog>
        <IconButton sx={BUTTON_SX}>
          {translate('notes_add')}
          <FaPlus size={20} />
        </IconButton>
      </AddEditGoalDialog>
      {list.map((goal) => (
        <NotesItem
          key={goal.id}
          note={goal}
        />
      ))}
    </Card>
  )
}
