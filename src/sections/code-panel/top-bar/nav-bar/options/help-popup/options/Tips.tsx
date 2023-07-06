import { Alert } from "@mui/material";
import { Stack } from "@mui/system";

const list = [
  "The double quotation marks are one character \" and not two single quotation ' marks.",
  "The double quotation marks are one character \" and not two single quotation ' marks.",
];

const Tips = (): React.ReactElement => {
  return (
    <Stack spacing={2}>
      {list.map((t, i) => (
        <Alert key={i} severity="info">
          {t}
        </Alert>
      ))}
    </Stack>
  );
};

export default Tips;
