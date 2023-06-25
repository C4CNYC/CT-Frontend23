import {
  alpha,
  Box,
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { IModule } from "src/redux/interfaces/class.interface";
import { addAlpha } from "@ct-nx/utils";
import ModuleStatistics from "./ModuleStatistics";

interface Props {
  data: IModule;
}

export default function ModuleItem({ data }: Props): React.ReactElement {
  const theme = useTheme();
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "25px",
        width: { sx: "100%", sm: "100%", md: "48%" },
      }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 3, md: 3 },
          py: { xs: 2, sm: 2, md: 2 },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip title={<Typography sx={{ p: 1 }}>{data.name}</Typography>}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {data.name}
          </Typography>
        </Tooltip>
        <Typography
          variant="subtitle2"
          sx={{
            height: { xs: "80px", sm: "100px" },
            overflowY: "auto",
            whiteSpace: "normal",
            "&::-webkit-scrollbar": {
              width: "0.3em",
            },
            "&::-webkit-scrollbar-track": {},
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(theme.palette.grey[600], 0.48),
              borderRadius: "2px",
            },
          }}
        >
          {data.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 2, md: 2 },
            pt: 3,
          }}
        >
          {" "}
          <Button
            variant="outlined"
            sx={{
              p: "5px 15px",
              borderRadius: "25px",
              fontSize: "1rem",
              borderColor: "#5ED0D5",
              color: "#5ED0D5",
              whiteSpace: "nowrap",
              borderWidth: "2px",
              "&:hover": {
                border: "2px solid #5ED0D5",
                backgroundColor: addAlpha("#5ED0D5", 0.1),
              },
            }}
          >
            Enroll Now 🚀
          </Button>
          <Button
            variant="outlined"
            sx={{
              p: "5px 15px",
              borderRadius: "25px",
              fontSize: "1rem",
              borderColor: "#364954",
              color: "#364954",
              whiteSpace: "nowrap",
              borderWidth: "2px",
              "&:hover": {
                border: "2px solid #364954",
                backgroundColor: addAlpha("#364954", 0.1),
              },
            }}
          >
            Explore
          </Button>
        </Box>
      </Stack>
      <ModuleStatistics progress={data.progress ?? 0} totalProgress={data.total_progress ?? 0}/>
    </Paper>
  );
}
