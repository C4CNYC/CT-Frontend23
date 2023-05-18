import Image from "@components/image/Image";
import { Badge, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
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
    <Button
      onClick={nextStep}
      sx={{
        color: "inherit",
        borderRadius: "15px",
        textAlign: "start",
        justifyContent: "flex-start",
        p: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          borderRadius: "15px",
          minWidth: "100%",
          width: "100%",
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
        <Stack sx={{ ml: 2, width: "100%" }}>
          <Badge
            badgeContent={badge}
            color={badge === "BETA" ? "error" : "primary"}
            invisible={!badge}
            sx={{
              width: "fit-content",
              "& .MuiBadge-badge": {
                fontSize: "10px",
                whiteSpace: "nowrap",

                right: "-15px",
                top: "0px",
              },
            }}
          >
            <Typography variant="h5" sx={{ display: "flex" }}>
              {title}
            </Typography>
          </Badge>

          <Tooltip
            disableHoverListener={subtitle.length < 85}
            title={<Typography variant="body2">{subtitle}</Typography>}
          >
            <Typography
              variant="body2"
              sx={{
                maxWidth: "300px",
                maxHeight: "50px",
              }}
            >
              {subtitle}
            </Typography>
          </Tooltip>
        </Stack>

        <Image
          src="/assets/on-boarding/arrow.svg"
          sx={{
            width: "25px",
            height: "30px",
            alignSelf: "center",
            justifySelf: "flex-end",
            ml: 1,
          }}
          alt=""
        />
      </Stack>
    </Button>
  );
}
