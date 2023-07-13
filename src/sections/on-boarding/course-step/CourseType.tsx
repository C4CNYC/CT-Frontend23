import {
  Badge,
  Box,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Image } from "@components";

interface Props {
  color: string;
  img: string;
  title: string;
  subtitle: string;
  badge?: string;
  chips: string[];
  disabled: boolean;
  goToStep?: (step: number) => void;
}

export default function CourseType({
  color,
  img,
  title,
  subtitle,
  badge,
  chips,
  disabled,
  goToStep,
}: Props): React.ReactElement {
  return (
    <Button
      disabled={disabled}
      sx={{
        color: "inherit",
        borderRadius: "15px",
        textAlign: "start",
        p: 2,
        pl: 1,
      }}
      onClick={() => {
        goToStep?.(4);
      }}
    >
      <Box
        sx={{
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          minWidth: { xs: "50px", sm: "100px" },
          height: { xs: "50px", sm: "100px" },
        }}
      >
        <Image src={img} width={100} height={100} alt="" />
      </Box>
      <Stack justifyContent="space-between" mx={2}>
        <Badge
          badgeContent={badge}
          color={badge === "BETA" ? "error" : "primary"}
          invisible={!badge}
          sx={{
            width: "fit-content",
            "& .MuiBadge-badge": {
              fontSize: "10px",
              whiteSpace: "nowrap",
              right: "-25px",
              top: "-5px",
            },
          }}
        >
          <Typography variant="h5" sx={{ display: "flex" }}>
            {title}
          </Typography>
        </Badge>

        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
          {chips.map((el) => (
            <Chip
              key={el}
              sx={{ background: "#43D4DD33" }}
              label={
                <Typography variant="caption" sx={{ fontSize: "10px" }}>
                  {el}
                </Typography>
              }
              size="small"
            />
          ))}
        </Stack>
        <Tooltip
          disableHoverListener={subtitle.length < 85}
          title={<Typography variant="body2">{subtitle}</Typography>}
        >
          <Typography
            variant="body2"
            sx={{
              maxWidth: "300px",
              maxHeight: "50px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box !important",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              whiteSpace: "normal",
            }}
          >
            {subtitle}
          </Typography>
        </Tooltip>
      </Stack>
      <Image
        src="/assets/on-boarding/arrow.svg"
        alt="arrow image"
        sx={{ width: "18px", height: "30px", alignSelf: "center" }}
      />
    </Button>
  );
}
