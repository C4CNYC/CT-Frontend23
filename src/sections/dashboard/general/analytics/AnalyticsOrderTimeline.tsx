// @mui
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";

// utils
import { fDateTime } from "@utils";

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  title: string;
  time: Date | string | number;
  type: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AnalyticsOrderTimeline({
  title,
  subheader,
  list,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface OrderItemProps {
  item: ItemProps;
  isLast: boolean;
}

function OrderItem({
  item,
  isLast,
}: OrderItemProps): React.ReactElement | null {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === "order1" && "primary") ||
            (type === "order2" && "success") ||
            (type === "order3" && "info") ||
            (type === "order4" && "warning") ||
            "error"
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
