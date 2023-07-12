import { Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardModule } from "@components";
import { CardTypes } from "src/redux/services/enums/card-types.enum";

export default function MainSectionHome(): React.ReactElement {
  return (
    <Paper
      elevation={10}
      sx={{ pt: 2, pb: 5, px: 4, borderRadius: 2, width: "100%" }}
    >
      <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
        What are you gonna create today?
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: 6,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CardModule
          type={CardTypes.lesson}
          image="/assets/images/card-image.png"
        />
        <CardModule
          type={CardTypes.course}
          image="/assets/images/card-image.png"
        />
        <CardModule
          type={CardTypes.module}
          image="/assets/images/card-image.png"
        />
      </Stack>
    </Paper>
  );
}
