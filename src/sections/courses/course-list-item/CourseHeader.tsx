import NextLink from "next/link";

import { TbFileCertificate } from "react-icons/tb";

import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

interface Props {
  progress: number | null;
}

export default function CourseHeader({ progress }: Props): React.ReactElement {
  const translate = useTranslate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        position: "relative",
      }}
    >
      {!progress ? (
        <>
          <Chip
            label="not started"
            variant="filled"
            sx={{
              textTransform: "uppercase",
              background: "rgba(145, 158, 171, 0.32)",
              maxWidth: "215px",
              fontWeight: 700,
              color: "#fff",
              mr: 2,
              height: "auto",
            }}
          />
          <Chip
            label="free"
            variant="filled"
            sx={{
              textTransform: "uppercase",
              background: "#FBDD3F",
              maxWidth: "215px",
              fontWeight: 700,
              color: "#fff",
              mr: 2,
              height: "auto",
            }}
          />
        </>
      ) : (
        <>
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
              border: "3px solid #C4C4C4",
              background: "#fff",
              color: "#333",
              zIndex: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {progress}%
            </Typography>
          </Avatar>
          <LinearProgress
            sx={{
              width: "100%",
              height: "20px",
              mx: "-5px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#75CF6D",
                borderRadius: 20,
              },
              backgroundColor: "#C4C4C4",
            }}
            variant="determinate"
            value={progress === 0 ? 2 : progress}
          />
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              color: "#fff",
              top: "9px",
              left: "20%",
              textTransform: "uppercase",
            }}
          >
            {translate("courses_enroled")}
          </Typography>{" "}
        </>
      )}

      <Tooltip
        title={
          <Box sx={{ width: "200px", p: "8px" }}>
            <Typography variant="body2" sx={{ color: "#fff", mb: "5px" }}>
              {translate("courses_certificate_tooltip_info")}
            </Typography>
            <Link component={NextLink} href="/" sx={{ color: "#FBDD3F" }}>
              {translate("courses_certificate_link")}
            </Link>
          </Box>
        }
        sx={{ background: "#000" }}
        placement="right-start"
      >
        <Avatar
          sx={{
            width: "40px",
            height: "40px",
            border: "3px solid #FBDD3F",
            background: "#fff",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <TbFileCertificate color="#FBDD3F" size="22px" />
        </Avatar>
      </Tooltip>
    </Box>
  );
}
