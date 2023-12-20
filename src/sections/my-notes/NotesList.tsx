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

interface INotesListProps extends CardProps {
  list: IGoals[];
}

export default function NotesList({ list }: INotesListProps) {
  const translate = useTranslate();

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", px: 3, pb: 3, gap: 2 }}
    >
      <CardHeader
        title={<Typography variant="h5">{translate("notes_my")}</Typography>}
      />
      <AddEditGoalDialog>
        <IconButton
          sx={{
            display: "flex",
            borderRadius: 3,
            py: 3,
            background: "rgba(99, 115, 129, 0.18)",
            width: "100%",
          }}
        >
          <FaPlus size="30px" />
        </IconButton>
      </AddEditGoalDialog>
      {list.map((goal) => (
        <NotesItem key={goal.id} note={goal} />
      ))}
    </Card>
  );
}
