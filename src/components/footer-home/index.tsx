import Editor from "@components/editor/Editor";
import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";

const StyledRoot = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up("md")]: {
    height: 560,
    padding: 0,
  },
}));

export default function FooterHome() {
  return (
    <StyledRoot>
      <Stack
        ml="40px"
        mt="24px"
        boxShadow="0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)"
        width="1100px"
        borderRadius="24px"
      >
        <Card>
          <Typography
            variant="h6"
            fontWeight="600"
            fontSize="18px"
            mt="24px"
            ml="24px"
            mb="24px"
          >
            Notes & Planning
          </Typography>
          <Stack width="683px" height="240px" ml="24px" mb="24px">
            <Editor simple></Editor>
          </Stack>
        </Card>
      </Stack>
    </StyledRoot>
  );
}
