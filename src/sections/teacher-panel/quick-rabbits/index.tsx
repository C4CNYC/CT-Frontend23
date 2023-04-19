import { Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import _ from "lodash";
import { quickRabbitAtom } from "../atoms/quick-rabbit.atom";
import QuickRabbitsItem from "./quick-rabbits-item";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";

export const QuickRabbits = (): React.ReactElement => {
  const [quickRabits, setQuckRabit] = useAtom(quickRabbitAtom);

  const onClose = (userId: string): void => {
    setQuckRabit((prev) => _.omit(prev, [userId]));
  };

  return (
    <Stack direction="row">
      <Grid container spacing={2} p={1} pr={9}>
        {Object.values(quickRabits).map((rabit) => (
          <Grid item key={rabit.id} xs={4}>
            <QuickRabbitsItem rabit={rabit} onClose={onClose} />
          </Grid>
        ))}
      </Grid>
      <Box width="0px" position="relative">
        <QuickRabbitsSideList />
      </Box>
    </Stack>
  );
};
