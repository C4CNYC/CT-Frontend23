import Button from "@mui/material/Button";

import { useStyles } from "./style";

interface Props {
  color: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
}

const TimerButton = ({
  color,
  onClick,
  text,
  ...rest
}: Props): React.ReactElement => {
  const classes = useStyles({ color });
  return (
    <Button {...rest} onClick={onClick} classes={{ root: classes.timerButton }}>
      {text}
    </Button>
  );
};

export default TimerButton;
