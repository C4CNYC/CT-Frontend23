import Image from "@components/image/Image";
import {
  Badge,
  Box,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import NextImage from "next/image";

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
    <Badge
      badgeContent={badge}
      color={badge === "BETA" ? "error" : "primary"}
      invisible={!!badge}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "10px",
          whiteSpace: "nowrap",
          right: "20px",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 1,
          pr: 0,
          background: disabled ? "#EAEAEB66" : "",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            background: color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            minWidth: "100px",
            height: "100px",
          }}
        >
          <Image src={img} width={100} height={100} alt="" />
        </Box>
        <Stack justifyContent="space-between" ml={1}>
          <Typography variant="h5" sx={{ display: "flex" }}>
            {title}
          </Typography>

          <Stack direction="row" gap={1}>
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
                width: "300px",
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
        <Button
          onClick={() => {
            goToStep?.(4);
          }}
          sx={{
            minWidth: "0",
            width: "35px",
            mt: 2,
            alignSelf: "flex-start",
          }}
        >
          <NextImage
            src="/assets/on-boarding/arrow.svg"
            width={20}
            height={30}
            alt=""
          />
        </Button>
      </Stack>
    </Badge>
  );
}
