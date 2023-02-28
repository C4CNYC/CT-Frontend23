import Iconify from "@components/iconify";
import { Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TriberItem from "./TriberItem";

export default function TriberList(): React.ReactElement {
  const usersArray = [
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
    {
      name: "Husna Navaro",
      email: "avery40@hoimail.com",
      img: "",
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        py: 5,
        px: 3,
        borderRadius: 2,
        width: { xs: "100%", sm: "100%", md: "auto" },
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">
          Triber List
          <Typography
            sx={{
              ml: 1,
              display: "inline-block",
              color: "gray",
              fontSize: "20px",
            }}
          >
            (40)
          </Typography>
        </Typography>
        <Iconify width="25px" color="lightgray" icon="mdi:information" />
      </Grid>
      <Stack spacing={2} sx={{ pt: 3 }}>
        {usersArray.map((item, i) => (
          <TriberItem name={item.name} email={item.email} key={item.name + i} />
        ))}
      </Stack>
    </Paper>
  );
}
