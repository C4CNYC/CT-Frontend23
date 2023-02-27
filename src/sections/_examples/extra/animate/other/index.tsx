import { useState } from "react";
// @mui
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// components
import Iconify from "@components/iconify";
//
import Button from "./Button";
import Logo from "./Logo";

// ----------------------------------------------------------------------

export default function Other(): React.ReactElement {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 1.5,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              }}
            >
              <CardHeader title="Button Click" />
              <Box sx={{ p: 5, minHeight: 180, "& > *": { mx: 1 } }}>
                <Button />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper
              variant="outlined"
              sx={{
                position: "relative",
                borderRadius: 1.5,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              }}
            >
              <CardHeader title="Path" />
              <Box sx={{ p: 5, minHeight: 180, "& > *": { mx: 1 } }}>
                <IconButton
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  sx={{ position: "absolute", right: 16, top: 16 }}
                >
                  <Iconify icon="eva:refresh-fill" />
                </IconButton>
                <Logo key={count} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
