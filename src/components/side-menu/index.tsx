import { BsBookmark } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TbCheckupList } from "react-icons/tb";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";

export function SideMenu() {
  return (
    <Container sx={{ width: "300px", mr: "20px" }}>
      <Stack spacing={1}>
        <Stack display="flex" alignItems="center" direction="row">
          <Button
            fullWidth
            startIcon={<BsBookmark size={16} />}
            sx={{
              color: "GrayText",
              pr: "80px",
              pl: "10px",
              pb: "10px",
              pt: "10px",
            }}
          >
            <Typography variant="body2" fontWeight="500" fontSize="18px">
              Pinned
            </Typography>
          </Button>
        </Stack>
        <Stack display="flex" alignItems="center" direction="row">
          <Button
            fullWidth
            startIcon={<TbCheckupList size={20} />}
            sx={{ color: "GrayText", pr: "40px", pb: "10px", pt: "10px" }}
            href="/courses"
          >
            <Typography variant="body2" fontWeight="500" fontSize="18px">
              All courses
            </Typography>
          </Button>
        </Stack>
        <Stack display="flex" alignItems="center" direction="row">
          <Button
            fullWidth
            sx={{ color: "GrayText", pr: "68px", pb: "10px", pt: "10px" }}
          >
            <FiSettings size={20} />
            <Typography
              variant="body2"
              fontWeight="500"
              fontSize="18px"
              ml="10px"
            >
              Settings
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <Stack mt="200px">
        <Button
          startIcon={<LogoutIcon />}
          sx={{ color: "GrayText", width: "200px", pr: "95px" }}
        >
          log out
        </Button>
      </Stack>
      <Stack
        width="180px"
        height="150px"
        display="flex"
        justifyContent="space-between"
        direction="row"
        p="20px"
        mt="20px"
        borderRadius="16px"
        color="white"
        sx={{ backgroundColor: "#8f84d3", cursor: "pointer" }}
      >
        <Typography variant="body2" fontWeight="700" fontSize="14px" mt="40px">
          Save big - <br /> get monthy <br /> subscrition!
        </Typography>
        <ArrowForwardIcon sx={{ mt: "85px" }} />
      </Stack>
    </Container>
  );
}
