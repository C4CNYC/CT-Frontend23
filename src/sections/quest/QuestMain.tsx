import { Avatar, Stack, Tooltip, Typography } from "@mui/material";

import { TOOLTIP_TEXT } from "@sections/main/quests/add-quest/constants";
import { BaseResponseInterface } from "@utils";
import { IStudent } from "src/redux/services/interfaces/user.interface";

interface IQuestMainProps {
  mentor?: IStudent & BaseResponseInterface;
  questName?: string;
}
export default function QuestMain({
  mentor,
  questName,
}: IQuestMainProps): React.ReactElement {
  return (
    <Stack sx={{ mt: 3 }}>
      <Stack
        sx={{ gap: 1, alignItems: "baseline", flexDirection: "row", mb: 1 }}
      >
        <Typography variant="h5">Quest</Typography>
        <Tooltip
          title={<Typography variant="body2">{TOOLTIP_TEXT}</Typography>}
        >
          <Typography variant="body2" sx={{ textDecoration: "underline" }}>
            What`s a quest?
          </Typography>
        </Tooltip>
      </Stack>
      <Typography variant="h2">{questName}</Typography>

      <Stack sx={{ ml: 1, mt: 1, flexDirection: "row", gap: 1 }}>
        <Avatar
          src={mentor?.avatar ?? ""}
          alt={mentor?.first_name ?? ""}
          sx={{
            width: "30px",
            height: "30px",
            border: "2px solid #5D6C75",
            background: "#260236",
          }}
        >
          🦙
        </Avatar>

        <Typography variant="h5">
          {mentor?.first_name} {mentor?.last_name}
          Admin
        </Typography>
      </Stack>
    </Stack>
  );
}
