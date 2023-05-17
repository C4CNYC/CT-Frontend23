import Image from "@components/image/Image";
import { Badge, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import NextImage from "next/image";
interface Props {
  color: string;
  img: string;
  title: string;
  subtitle: string;
  badge?: string;
  nextStep?: () => void;
}

export default function GroupItem({
  color,
  img,
  title,
  subtitle,
  badge,
  nextStep,
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
          right: "80px",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 1,
          pr: 0,
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
            minWidth: "80px",
            height: "80px",
          }}
        >
          <Image src={img} width={80} height={80} alt="" />
        </Box>
        <Stack ml={3}>
          <Typography variant="h5" sx={{ display: "flex" }}>
            {title}
          </Typography>

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
          onClick={nextStep}
          sx={{
            minWidth: "0",
            width: "35px",
            alignSelf: "center",
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
