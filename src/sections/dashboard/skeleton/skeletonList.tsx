import { useSettingsContext } from "@components/settings";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import SkeletonFilter from "./skeletonFilter";
type Props = {
  item?: React.ReactElement;
  filter?: number;
};
const defaultItem = (
  <Skeleton
    variant="rectangular"
    animation="wave"
    sx={{
      width: "373px",
      height: "124px",
      borderRadius: "16px",
    }}
  />
);
export default function SkeletonList({
  item = defaultItem,
  filter = 1,
}: Props): React.ReactElement {
  const { themeStretch } = useSettingsContext();
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "40px",
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: "180px",
              height: "36px",
              borderRadius: "8px",
              mb: "8px",
            }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              mr: "16px",
              width: "260px",
              height: "26px",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: "134px",
              height: "36px",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
      <Stack direction="row">
        {[...Array(filter)].map((item, i) => (
          <SkeletonFilter />
        ))}
      </Stack>
      {item}
    </Container>
  );
}
