import { AiOutlineUserAdd } from "react-icons/ai";
import { FaChartLine } from "react-icons/fa";
import { TbBrandWechat } from "react-icons/tb";

import { Box, Button, Stack, Typography } from "@mui/material";

export default function TribeButtons(): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 5,
        py: 3,
      }}
    >
      <Stack alignItems="center">
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "56px",
            height: "56px",
            p: 0,
            color: "#02D3D7",
            background: "rgba(2, 211, 215, 0.08)",
            "&:hover": {
              border: "1px solid #02D3D7",
              background: "rgba(2, 211, 215, 0.08)",
            },
          }}
        >
          <TbBrandWechat size="30px" />
        </Button>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
          Chat
        </Typography>
      </Stack>
      <Stack alignItems="center">
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "56px",
            height: "56px",
            p: 0,
            color: "#02D3D7",
            background: "rgba(2, 211, 215, 0.08)",
            "&:hover": {
              border: "1px solid #02D3D7",
              background: "rgba(2, 211, 215, 0.08)",
            },
          }}
        >
          <FaChartLine size="23px" />
        </Button>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
          Progress
        </Typography>
      </Stack>
      <Stack alignItems="center">
        <Button
          variant="contained"
          sx={{
            borderRadius: "50%",
            minWidth: "56px",
            height: "56px",
            p: 0,
            color: "#02D3D7",
            background: "rgba(2, 211, 215, 0.08)",
            "&:hover": {
              border: "1px solid #02D3D7",
              background: "rgba(2, 211, 215, 0.08)",
            },
          }}
        >
          <AiOutlineUserAdd size="28px" />
        </Button>
        <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
          Invite
        </Typography>
      </Stack>
    </Box>
  );
}
