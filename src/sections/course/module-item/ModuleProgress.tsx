import NextLink from "next/link";

import { TbFileCertificate } from "react-icons/tb";

import {
  Box,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

interface IModuleProgressProps {
  progress: string;
}

export default function ModuleProgress({
  progress,
}: IModuleProgressProps): React.ReactElement {
  return (
    <Stack sx={{ position: "relative", my: 1 }}>
      <Tooltip placement="top" title={`${progress}% Complete`}>
        <LinearProgress
          variant="determinate"
          value={+progress}
          sx={{
            "& .MuiLinearProgress-bar": {
              background: "#454F5B",
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
              This course is eligiable for a certificate.
            </Typography>
            <Link
              component={NextLink}
              href="#"
              underline="none"
              typography="caption"
              color="#FBDD3F"
            >
              See sample certificate
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
            backgroundColor: "#FFF",
            borderRadius: "50%",
            border: "2px solid #D9D9E2",
          }}
        >
          <TbFileCertificate size={15} />
        </Box>
      </Tooltip>
    </Stack>
  );
}
