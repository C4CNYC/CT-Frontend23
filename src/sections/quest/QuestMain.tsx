import {
  Avatar,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useFilters } from "@hooks";
import AuthorsCard from "@sections/dashboard/courses/authors-tab/AuthorsCard";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";
import { useGetAuthorsQuery } from "src/redux/services/manager/author-manager";

interface Prop {
  author?: string;
}
export default function QuestMain({ author }: Prop): React.ReactElement {
  return (
    <Stack sx={{ mt: 3 }}>
      <Stack sx={{ gap: 3, alignItems: "center", flexDirection: "row", mb: 1 }}>
        <Typography variant="h5">Quest</Typography>
        <Tooltip title="this is...">
          <Typography variant="body2" sx={{ textDecoration: "underline" }}>
            What is quest?
          </Typography>
        </Tooltip>
      </Stack>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Quest name long long name ....
      </Typography>
      <Stack sx={{ ml: 1, flexDirection: "row", gap: 1 }}>
        <Avatar
          sx={{
            width: "30px",
            height: "30px",
            border: "2px solid #5D6C75",
            background: "#260236",
          }}
        >
          🦙
        </Avatar>

        <Typography variant="h5">{author}</Typography>
      </Stack>
    </Stack>
  );
}
