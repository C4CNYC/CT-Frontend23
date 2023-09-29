import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface IBasePreference {
  children: React.ReactElement;
  title: string;
  abandonmentIcon?: React.ReactElement;
}

const BasePreference = ({
  title,
  children,
  abandonmentIcon,
}: IBasePreference): React.ReactElement => {
  return (
    <Box
      sx={(theme) => ({
        p: "25px 30px 30px 30px",
        bgcolor: theme.palette.mode === "light" ? "#F0EEEE" : "",
        border: theme.palette.mode === "light" ? "" : "1px solid #F0EEEE",
        borderRadius: "15px",
      })}
    >
      <Box
        mb="20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">{title.toUpperCase()}</Typography>
        {abandonmentIcon ?? null}
      </Box>
      {children}
    </Box>
  );
};

export default BasePreference;
