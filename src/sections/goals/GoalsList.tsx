import { FaPlus } from "react-icons/fa";

import {
  Card,
  CardHeader,
  CardProps,
  IconButton,
  Typography,
} from "@mui/material";

import { IGoals } from "src/redux/interfaces/goals.interface";

import AddEditGoalDialog from "./AddEditGoalDialog";
import GoalsItem from "./GoalItem";

interface Props extends CardProps {
  list: IGoals[];
}

export default function GoalsList({ list }: Props) {
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", px: 3, pb: 3, gap: 2 }}
    >
      <CardHeader title={<Typography variant="h5">TODOs</Typography>} />
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
        <GoalsItem key={goal.id} goal={goal} />
      ))}
    </Card>
  );
}
