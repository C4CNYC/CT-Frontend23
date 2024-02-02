import { AiOutlineUserAdd } from "@react-icons/all-files/ai/AiOutlineUserAdd";
import { FaChartLine } from "@react-icons/all-files/fa/FaChartLine";
import { TbBrandWechat } from "@react-icons/all-files/tb/TbBrandWechat";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useTranslate } from "src/lib/utils/translateHelper";

export default function TribeButtons(): React.ReactElement {
  const translate = useTranslate();

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
          {translate("chat")}
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
          {translate("progress")}
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
          {translate("actions_invite")}
        </Typography>
      </Stack>
    </Box>
  );
}
