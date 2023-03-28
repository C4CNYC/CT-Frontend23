import { useSettingsContext } from "@components/settings";
import { Container, Skeleton } from "@mui/material";

export default function SkeletonSchool(): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          height: "280px",
          borderRadius: "16px",
          mb: 2,
        }}
      />
    </Container>
  );
}
