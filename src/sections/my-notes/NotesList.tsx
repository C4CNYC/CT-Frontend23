import { FaPlus } from "react-icons/fa";

import {
  Card,
  CardHeader,
  CardProps,
  IconButton,
  Typography,
} from "@mui/material";

import { IGoals } from "src/redux/interfaces/goals.interface";
import { useTranslate } from "src/utils/translateHelper";

import AddEditGoalDialog from "./AddEditGoalDialog";
import NotesItem from "./NotesItem";
import { BUTTON_SX, CARD_SX } from "./constants";

interface INotesListProps extends CardProps {
  list: IGoals[];
}

export default function NotesList({ list }: INotesListProps) {
  const translate = useTranslate();

  return (
    <Card sx={CARD_SX}>
      <CardHeader
        title={<Typography variant="h5">{translate("notes_my")}</Typography>}
      />
      <AddEditGoalDialog>
        <IconButton sx={BUTTON_SX}>
          {translate("notes_add")}
          <FaPlus size={20} />
        </IconButton>
      </AddEditGoalDialog>
      {list.map((goal) => (
        <NotesItem key={goal.id} note={goal} />
      ))}
    </Card>
  );
}
