import NextLink from "next/link";

import { TbFileCertificate } from "react-icons/tb";

import {
  Box,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface IModuleProgressProps {
  progress: string;
}

export default function ModuleProgress({
  progress,
}: IModuleProgressProps): React.ReactElement {
  const theme = useTheme();
  const translate = useTranslate();

  return (
    <Stack sx={{ position: "relative", my: 1 }}>
      <Tooltip
        placement="top"
        title={translate("modules_completed", {
          percentage: progress,
        })}
      >
        <LinearProgress
          variant="determinate"
          value={+progress}
          sx={{
            "& .MuiLinearProgress-bar": {
              background:
                "background: linear-gradient(135deg, #90F361 0%, #00D9CC 100%);",
            },
            position: "relative",
            background: "#D9D9E2",
          }}
        />
      </Tooltip>
      <Tooltip
        placement="top-start"
        title={
          <Stack maxWidth={200} gap={1} py={1}>
            <Typography variant="caption">
              {translate("courses_certificate_tooltip_info")}
            </Typography>
            <Link
              component={NextLink}
              href="#"
              underline="none"
              typography="caption"
              color="#FBDD3F"
            >
              {translate("courses_certificate_link")}
            </Link>
          </Stack>
        }
      >
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "-10px",
            width: "25px",
            height: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme.palette.mode === "light" ? "#000" : "#fff",
            backgroundColor: "#FFF",
            borderRadius: "50%",
            border: "2px solid #D9D9E2",
          }}
        >
          <TbFileCertificate size={15} color={"black"} />
        </Box>
      </Tooltip>
    </Stack>
  );
}
