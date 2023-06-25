import { Stack, TextField, Typography } from "@mui/material";

interface Props {
  setInputSeconds: (t: number) => void;
  inputSeconds: number;
}
export const TimerInput = ({
  setInputSeconds,
  inputSeconds,
}: Props): React.ReactElement => {
  return (
    <Stack direction="row" alignItems="center">
      <TextField
        inputProps={{
          inputMode: "numeric",
          pattern: "^[0-9]+$",
        }}
        InputProps={{ disableUnderline: true }}
        placeholder="m"
        value={Math.floor(inputSeconds / 60)}
        sx={{
          width: "33px",
          "& .MuiInputBase-input": {
            textAlign: "center",
            fontWeight: "700",
            height: "15px",
            fontSize: "1.5rem",
          },
        }}
        variant="standard"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (isNaN(event.target.value) || event.target.value > 60) {
            return;
          }
          setInputSeconds(Number(event.target.value) * 60);
        }}
      />
      <Typography variant="h4">m</Typography>
    </Stack>
  );
};
