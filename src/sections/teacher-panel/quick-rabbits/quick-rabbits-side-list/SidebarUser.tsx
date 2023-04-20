import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { quickRabbitAtom } from "@sections/teacher-panel/atoms/quick-rabbit.atom";
import { IChatMessage, useFirebaseChat } from "@sections/teacher-panel/atoms/useFirebaseChat.hook";
import LoaderDelay from "@sections/teacher-panel/LoaderDelay";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/auth/useAuthContext";

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
  const [, setQuickRabbit] = useAtom(quickRabbitAtom);
  const { first_name, last_name, email, active, id } = student;

  useEffect(() => {
    getMessages(senderId, id, (data) => {
      if (!data.length) return;
      setLastMessage(data[0]);
    }, 1)
  }, [])

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
            <Avatar
              alt={first_name}
              src="/static/images/avatar/1.jpg"
              sx={{
                width: { xs: 40, sm: 40, md: 50 },
                height: { xs: 40, sm: 40, md: 50 },
              }}
            />
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
      <IconButton onClick={onConnectStudent}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
};
