import { Card, Stack, Typography } from "@mui/material";

export function InfoCourses(): React.ReactElement {
  return (
    <Stack
      display="flex"
      direction="column"
      alignItems="center"
      width="300px"
      mt="100px"
    >
      <Stack>
        <Card
          sx={{
            width: "100px",
            ml: "20px",
            mb: "20px",
            p: "20px",
          }}
        >
          <Typography color="#978fbd">02</Typography>
          <Typography variant="body2" fontWeight="400" fontSize="8px">
            Starting in
          </Typography>
        </Card>
        <Card
          sx={{
            width: "100px",
            ml: "20px",
            mb: "20px",
            p: "20px",
          }}
        >
          <Typography color="#978fbd">68</Typography>
          <Typography variant="body2" fontWeight="400" fontSize="8px">
            Duration
          </Typography>
        </Card>
        <Card
          sx={{
            width: "100px",
            ml: "20px",
            mb: "20px",
            p: "20px",
          }}
        >
          <Typography color="#978fbd">16</Typography>
          <Typography variant="body2" fontWeight="400" fontSize="8px">
            Your group
          </Typography>
        </Card>
        <Card
          sx={{
            width: "100px",
            ml: "20px",
            mb: "20px",
            p: "20px",
          }}
        >
          <Typography color="#978fbd">10</Typography>
          <Typography variant="body2" fontWeight="400" fontSize="8px">
            on Behance
          </Typography>
        </Card>
      </Stack>
    </Stack>
  );
}
