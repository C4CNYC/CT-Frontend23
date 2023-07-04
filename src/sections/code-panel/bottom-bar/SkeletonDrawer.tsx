import { Divider, List, ListItem, Skeleton, Stack } from "@mui/material";

export default function SkeletonDrawer(): React.ReactElement {
  return (
    <Stack>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ m: "12px 0 12px 8px", px: "10px" }}
        >
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "100px", height: "28px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "24px", height: "24px", mr: "5px" }}
          />
        </Stack>
        <List sx={{ px: "10px" }}>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 24px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "24px", height: "24px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100px", height: "22px", ml: "24px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 24px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "24px", height: "24px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100px", height: "22px", ml: "24px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 24px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "24px", height: "24px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100px", height: "22px", ml: "24px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 24px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "24px", height: "24px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100px", height: "22px", ml: "24px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              p: "16px 24px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "24px", height: "24px" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: "100px", height: "22px", ml: "24px" }}
            />
          </ListItem>
        </List>
      </Stack>
      <Divider sx={{ height: 2 }} />
    </Stack>
  );
}
