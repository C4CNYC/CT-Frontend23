import Button from "@mui/material/Button";

interface Props {
  color: "primary" | "info" | "error" | "success" | "inherit";
  variant: "contained" | "soft" | "outlined";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
}

const TimerButton = ({
  color,
  onClick,
  text,
  variant,
  ...rest
}: Props): React.ReactElement => {
  return (
    <Button
      {...rest}
      color={color}
      variant={variant}
      onClick={onClick}
      sx={{ minWidth: 130 }}
    >
      {text}
    </Button>
  );
};

export default TimerButton;
