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
import LoaderDelay from "@sections/teacher-panel/LoaderDelay";
import { useAtom } from "jotai";

const AvatarSkeleton = () => {
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
  const [, setQuickRabbit] = useAtom(quickRabbitAtom);
  const { first_name, email, active, id } = student;

  const onConnectStudent = (): void => {
    setQuickRabbit((prev) => ({ ...prev, [id]: { id, email } }));
  };

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
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {first_name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {email}
        </Typography>
      </Box>
      <IconButton onClick={onConnectStudent}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
};
