import { Container, Skeleton } from "@mui/material";

import { useSettingsContext } from "@components";

export default function SkeletonTribe(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: { xs: "100%", sm: "100%", md: "330px" },
          height: "280px",
          borderRadius: "16px",
          mb: 2,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: { xs: "100%", sm: "100%", md: "330px" },
          height: "106px",
          borderRadius: "16px",
          mb: 2,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: { xs: "100%", sm: "100%", md: "330px" },
          height: "198px",
          borderRadius: "16px",
          mb: 2,
        }}
      />
    </Container>
  );
}
