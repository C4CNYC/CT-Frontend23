// @mui
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

// components
import { Iconify, Image, Scrollbar } from "@components";
// utils
import { fToNow } from "@utils";

// ----------------------------------------------------------------------

interface ItemProps {
  id: string;
  title: string;
  description: string;
  postedAt: number | Date;
  image: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AnalyticsNewsUpdate({
  title,
  subheader,
  list,
  ...other
}: Props): React.ReactElement | null {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface NewsItemProps {
  news: ItemProps;
}

function NewsItem({ news }: NewsItemProps): React.ReactElement | null {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
