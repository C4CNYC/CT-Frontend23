import { useOnlineConnection } from "@hooks/useOnlineConnection";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { onlineStudentsAtom } from "@sections/teacher-panel/atoms/online-students.atom";
import { quickRabbitAtom } from "@sections/teacher-panel/atoms/quick-rabbit.atom";
import { IChatMessage, useFirebaseChat } from "@sections/teacher-panel/atoms/useFirebaseChat.hook";
import LoaderDelay from "@sections/teacher-panel/LoaderDelay";
import { useAtom } from "jotai";
import { isNull } from "lodash";
import { useEffect, useState } from "react";

const AvatarSkeleton = (): React.ReactElement => {
  return (
    <Skeleton
      variant="circular"
      animation="wave"
      sx={{
        width: { xs: 40, sm: 40, md: 50 },
        height: { xs: 40, sm: 40, md: 50 },
      }}
    />
  );
};

interface Props {
  student: Record<string, any>;
  isLoading: boolean;
}

export const SidebarUser = ({
  student,
  isLoading,
}: Props): React.ReactElement => {
  const senderId = "SUPPORT";
  const [lastMessage, setLastMessage] = useState<IChatMessage>()
  const { getMessages } = useFirebaseChat();
  const [,setUserOnline] = useAtom(onlineStudentsAtom);
  const [, setQuickRabbit] = useAtom(quickRabbitAtom);
  const { lastTimeActivity, isOnline } = useOnlineConnection(student.id);
  const { first_name, last_name, email, active, id, avatar } = student;

  useEffect(() => {
    getMessages(senderId, id, (data) => {
      if (!data.length) return;
      setLastMessage(data[0]);
    }, 1)
  }, [])

  useEffect(() => {
    setUserOnline(prev => ({
      ...prev,
      [student.id]: isOnline
    }))
  }, [isOnline])

  const onConnectStudent = (): void => {
    setQuickRabbit((prev) => ({ ...prev, [id]: { id, email } }));
  };

  const getSubText = (): string => {
    if (!lastMessage) return ""
    const sender = lastMessage?.sender_id === senderId ? "Me" : first_name;
    return `${sender}: ${lastMessage.text}`;
  }

  return (
    <ListItem sx={{ pl: 0 }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        variant="dot"
        sx={{ backdrop: active ? "#36B37E" : "transparent" }}
      >
        <LoaderDelay
          skeleton={<AvatarSkeleton />}
          component={
            <Tooltip placement="left" title={getTooltipAvatarMessage(lastTimeActivity, isOnline)} >
              <Avatar
                alt={first_name}
                src={avatar ?? "https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"}
                sx={{
                  width: { xs: 40, sm: 40, md: 50 },
                  height: { xs: 40, sm: 40, md: 50 },
                  border: `5px solid ${getAvatarColor(lastTimeActivity)}`
                }}
              />
            </Tooltip>
          }
          isLoading={isLoading}
          deley={1000}
        />
      </Badge>
      <Box
        sx={{
          width: "100%",
          pl: 2,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {first_name} {last_name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {getSubText()}
        </Typography>
      </Box>
      <Tooltip placement="left" title={isOnline ? "connect" : "user is not available"}>
        <Box>
          <IconButton disabled={!isOnline} onClick={onConnectStudent}>
           <AddIcon />
          </IconButton>
        </Box>

      </Tooltip>
    </ListItem>
  );
};

function getAvatarColor(time: number | null): string {
  if (isNull(time)) return "#C4C4C4";
  if (time >= 0 && time <= 5) return "#0198ED";
  if (time < 50 && time > 5) return "#E27510";
  return "#C4C4C4";
}

function getTooltipAvatarMessage (time: number | null, isOnline: boolean): string {
  if (!isOnline) return "student offline"
  if (isNull(time)) return "was active long time ago";
  if (time === 0 || time <= 5) return "active"
  if (time < 50 && time > 5) return `was active ${time} minutes ago`
  return "was active long time ago"
}
