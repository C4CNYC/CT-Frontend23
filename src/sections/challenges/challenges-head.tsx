import {
  List,
  Paper,
  Stack,
  Button,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import VideocamIcon from "@mui/icons-material/Videocam";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { PATH_PAGE } from "@routes/paths";
import ChallengesDialog from "./challenges-dialog";

export default function ChallengesHead(): React.ReactElement {
  return (
    <>
      <Paper
        elevation={4}
        square={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton href={`${PATH_PAGE.home}`} sx={{ marginRight: 3 }}>
          <LogoutIcon
            color="primary"
            sx={{ width: "20px", transform: "rotate(180deg)" }}
          />
        </IconButton>
        <Stack direction="row" sx={{ mr: "-210px" }}>
          <IconButton>
            <ArrowCircleLeftIcon color="primary" />
          </IconButton>
          <ChallengesDialog>
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: "#333",
              }}
            >
              <ListAltIcon />
              <Typography variant="h6" sx={{ marginLeft: 1 }}>
                Lessons list
              </Typography>
            </Button>
          </ChallengesDialog>
          <IconButton>
            <ArrowCircleRightIcon color="primary" />
          </IconButton>
        </Stack>
        <List sx={{ display: "flex", flex: "0 0 15%" }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: "0 14px 0 0" }}>
              <ListItemIcon>
                <EmojiEventsIcon color="warning" />
              </ListItemIcon>
              <ListItemText
                primary="Your score"
                primaryTypographyProps={{
                  whiteSpace: "nowrap",
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: 0 }}>
              <ListItemIcon>
                <AddToHomeScreenIcon sx={{ width: "20px" }} color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: 0 }}>
              <ListItemIcon>
                <VideocamIcon color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: 0 }}>
              <ListItemIcon>
                <AssignmentIcon sx={{ width: "20px" }} color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ padding: 0 }}>
              <ListItemIcon>
                <NoteAltIcon sx={{ width: "20px" }} color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </>
  );
}
