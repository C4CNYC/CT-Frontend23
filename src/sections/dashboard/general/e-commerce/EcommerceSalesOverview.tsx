// @mui
import {
  Card,
  CardHeader,
  CardProps,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

// utils
import { fCurrency, fPercent } from "@utils";

// ----------------------------------------------------------------------

interface ItemProps {
  label: string;
  amount: number;
  value: number;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
}

export default function EcommerceSalesOverview({
  title,
  subheader,
  data,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={4} sx={{ p: 3 }}>
        {data.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface ProgressItemProps {
  progress: ItemProps;
}

function ProgressItem({
  progress,
}: ProgressItemProps): React.ReactElement | null {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">
          {fCurrency(progress.amount)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === "Total Income" && "info") ||
          (progress.label === "Total Expenses" && "warning") ||
          "primary"
        }
      />
    </Stack>
  );
}
