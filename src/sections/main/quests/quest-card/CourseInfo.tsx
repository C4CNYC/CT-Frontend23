import { CiShare1 } from "react-icons/ci";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Iconify } from "src/components/iconify";

export default function CourseInfo() {
  return (
    <>
      <Box>
        <Typography display="flex" justifyContent="end">
          course
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Iconify icon="bx:award" sx={{ color: "#EE467A" }} />
          <Iconify icon="flat-color-icons:ok" sx={{ color: "#75CF6D" }} />
          <Typography fontSize="16px" fontWeight="700">
            82 %
          </Typography>
        </Box>
        <Button
          endIcon={<CiShare1 />}
          sx={{
            mt: "12px",
            color: "#C4C4C4",
            "&:hover": {
              backgroundColor: "none",
            },
          }}
        >
          See more
        </Button>
      </Box>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ width: "40px", mr: "40px" }}
      />
      <Stack mt="23px">
        <IconButton sx={{ alignSelf: "flex-end" }}>
          <Iconify icon="tabler:pinned" color="#C4C4C4" />
        </IconButton>
        <Box>
          <IconButton>
            <Iconify icon="ion:share-outline" color="#C4C4C4" />
          </IconButton>
          <IconButton>
            <Iconify icon="pepicons-pop:dots-y" color="#C4C4C4" />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
}
