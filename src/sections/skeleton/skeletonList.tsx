import { Box, Container, Skeleton } from "@mui/material";

import { useSettingsContext } from "@components";

import SkeletonFilter from "./skeletonFilter";

interface Props {
  item?: React.ReactNode;
  count?: number;
  filter?: number;
}
export const DefaultSkeletonItem = (): React.ReactElement => (
  <Skeleton
    variant="rectangular"
    animation="wave"
    sx={{
      width: { xs: "100%", sm: "100%", md: "100%", xl: "373px" },
      height: "124px",
      borderRadius: "16px",
    }}
  />
);
export default function SkeletonList({
  item = <DefaultSkeletonItem />,
  filter = 1,
  count = 1,
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
              width: "280px",
              height: "26px",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
      <Box gap={3}>
        {Array(filter)
          .fill(null)
          .map((item, i) => (
            <SkeletonFilter key={i} />
          ))}
      </Box>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {Array(count)
          .fill(null)
          .map((e, i) => item)}
      </Box>
    </Container>
  );
}
