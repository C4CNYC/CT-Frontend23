import { Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { EmptyContent, Iconify } from "@components";
import { SkeletonTriberListItem } from "@sections/main/skeletonsMain";
import { useGetClassesQuery } from "src/redux/services/student/classes-manager";

import TriberItem from "./triberItem";

export default function TriberList(): React.ReactElement {
  const { data, isLoading } = useGetClassesQuery({ take: 7 });

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
        mb="40px"
      >
        <Typography variant="h5">Triber List</Typography>
        <Iconify width="20px" color="lightgray" icon="mdi:information" />
      </Grid>
      <Stack spacing={2}>
        {isLoading ? (
          <SkeletonTriberListItem />
        ) : !data?.data.length ? (
          <EmptyContent
            sx={{
              width: "232px",
              "& .wrapper": {
                width: "auto!important",
                height: "auto!important",
              },
            }}
            title="You don't have any tribes"
          />
        ) : (
          data?.data.map((classe) => (
            <TriberItem tribe={classe} key={classe.id} />
          ))
        )}
      </Stack>
    </Paper>
  );
}
