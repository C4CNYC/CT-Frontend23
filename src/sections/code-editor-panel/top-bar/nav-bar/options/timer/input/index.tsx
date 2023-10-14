import { type FC } from 'react'

import {
  type InputBaseComponentProps,
  Stack,
  TextField,
  Typography
} from "@mui/material";

interface TimerInputProps {
  setInputSeconds: (t: number) => void;
  inputSeconds: number;
}

const MAX_SECONDS = 60;
const INPUT_PROPS = { disableUnderline: true }
const INPUT_PROPS_MODE: InputBaseComponentProps = {
  inputMode: "numeric",
  pattern: "^[0-9]+$",
}
const STYLES = {
  width: "33px",
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontWeight: "700",
    height: "15px",
    fontSize: "1.5rem",
  },
}

export const TimerInput: FC<TimerInputProps> = ({
  setInputSeconds,
  inputSeconds,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <TextField
        inputProps={INPUT_PROPS_MODE}
        InputProps={INPUT_PROPS}
        placeholder="m"
        value={Math.floor(inputSeconds / MAX_SECONDS)}
        sx={STYLES}
        variant="standard"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const number = Number(event.target.value);

          if (isNaN(number) || (number > MAX_SECONDS)) {
            return;
          }

          setInputSeconds(number * MAX_SECONDS);
        }}
      />
      <Typography variant="h4">m</Typography>
    </Stack>
  );
};
