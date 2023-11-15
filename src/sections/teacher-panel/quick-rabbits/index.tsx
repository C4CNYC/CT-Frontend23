import { useRouter } from "next/router";

import { Grid, Stack } from "@mui/material";
import { Box, useTheme } from "@mui/system";

import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";

import QuickRabbitsItem from "./quick-rabbits-item";
import { QuickRabbitsSideList } from "./quick-rabbits-side-list";
import { RootState, useSelector } from "src/redux/store";
import { useDispatch } from "react-redux";
import { removeRabit } from "src/redux/slices/rabits";
import { io } from "socket.io-client";
import { useSocket } from "@hooks";

export const QuickRabbits = (): React.ReactElement => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { query, push } = useRouter();
  const rabits = useSelector((state: RootState) => state.rabits.items);

  const socket = useSocket();

  const onClose = (userId: string): void => {
    // This is working, but not very pretty. We should unify all socket connections in a context, so we can access the socket here easily
    socket.emit("leaveRoom", userId);
    dispatch(removeRabit({ id: userId }))
    if (userId === query?.id) {
      push(MANAGER_PATH_DASHBOARD.school.controller(query?.id));
    }
  };

  return (
    <Stack direction="row">
      <Grid
        container
        gap={2}
        display="grid"
        p={2}
        pr={9}
        sx={{
          [theme.breakpoints.up(940)]: {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
          [theme.breakpoints.up(940)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.up(1400)]: {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          [theme.breakpoints.up(1800)]: {
            gridTemplateColumns: "repeat(4, 1fr)",
          },
          [theme.breakpoints.up(2200)]: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
        }}
      >
        {Object.values(rabits).map((rabit) => (
          <QuickRabbitsItem
            rabit={rabit}
            key={rabit?.id ?? ""}
            onClose={onClose}
          />
        ))}
      </Grid>
      <Box width="0px" position="relative">
        <QuickRabbitsSideList />
      </Box>
    </Stack>
  );
};
