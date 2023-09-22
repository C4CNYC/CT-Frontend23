import { Avatar, Paper, Stack, Typography, useTheme } from "@mui/material";

interface IAuthorsSectionProps {}

export default function AuthorsSection({}: IAuthorsSectionProps): React.ReactElement {
  const theme = useTheme();
  return (
    <Paper
      elevation={8}
      sx={{
        background: "#F8F8F8",
        borderRadius: 3,
        px: 3,
        py: 2,
        mt: 3,
        minWidth: "250px",
        [theme.breakpoints.down(1400)]: {
          ml: "0",
        },
      }}
    >
      <Typography variant="h6" fontWeight={400} color="#364954" gutterBottom>
        AUTHOR
      </Typography>
      <Stack gap={1}>
        <Avatar
          alt="Jason"
          src=""
          sx={{
            width: "60px",
            height: "60px",
            border: "2px solid #EE467A",
            mr: 2,
          }}
        />
        <Typography
          noWrap
          variant="body1"
          maxWidth="150px"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          Jason J.
        </Typography>
      </Stack>
    </Paper>
  );
}
