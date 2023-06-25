import { Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function SkeletonViewBlock(): React.ReactElement {
  return (
    <Stack sx={{ bgcolor: "#F2F2F2", p: 1 }} width="100%" height="100vh">
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="5px"
      >
        <Skeleton height="18px" width="192px" sx={{ bgcolor: "#D9D9D9" }} />
        <Stack spacing={1} display="flex" direction="row">
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={{ bgcolor: "#D9D9D9" }}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={{ bgcolor: "#D9D9D9" }}
          />
          <Skeleton
            height="13px"
            width="13px"
            variant="circular"
            sx={{ bgcolor: "#D9D9D9" }}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: "calc(91vh - 80px)",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            mt: "58px",
            mb: "20px",
            textAlign: "center",
            color: "#c4c4c4",
            fontSize: "1.1rem",
          }}
          variant="subtitle1"
        >
          No preview available?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            m: "0px auto",
            textAlign: "center",
            color: "#c4c4c4",
            fontSize: "1.1rem",
            maxWidth: "250px",
          }}
        >
          That means it’s time to get coding. 🤓
        </Typography>
      </Stack>
    </Stack>
  );
}
