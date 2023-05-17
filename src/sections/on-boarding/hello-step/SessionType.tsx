import Image from "@components/image/Image";
import { Badge, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { roadAtom } from "../road-atom";
import { ISessionType } from "./HelloStep";
interface Props {
  title: string;
  subtitle: string;
  img: string;
  info: string;
  color: string;
  type: ISessionType;
  nextStep?: () => void;
  goToStep?: (step: number) => void;
}

export function SessionType({
  type,
  title,
  subtitle,
  img,
  info,
  color,
  nextStep,
  goToStep,
}: Props): React.ReactElement {
  const [, setSessionWay] = useAtom(roadAtom);
  const chooseWay = () => {
    if (type === ISessionType.popup) {
      setSessionWay({ sessionWay: true });
      nextStep?.();
    } else {
      setSessionWay({ sessionWay: false });
      goToStep?.(3);
    }
  };
  return (
    <Stack direction="row">
      <Tooltip title={info} placement="top-end">
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          color="primary"
          badgeContent={"i"}
        >
          <Box
            sx={{
              background: color,
              borderRadius: "15px",
              mr: 1,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100px",
              height: "100px",
            }}
          >
            <Image src={img} />
          </Box>
        </Badge>
      </Tooltip>
      <Stack sx={{ pl: 2 }}>
        <Typography variant="h4" textAlign="start" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          textAlign="start"
          sx={{ maxWidth: "250px" }}
        >
          {subtitle}
        </Typography>
      </Stack>
      <Button
        onClick={chooseWay}
        sx={{
          height: "72px",
          minWidth: "45px",
          minHeight: "60px",
          alignSelf: "center",
          p: 1,
          ml: 1,
        }}
      >
        <Image src="/assets/on-boarding/arrow.svg" />
      </Button>
    </Stack>
  );
}
