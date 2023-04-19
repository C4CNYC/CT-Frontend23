import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

import { useState } from "react";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { SidebarUser } from "./SidebarUser";
import { SkeletonSidebarUser } from "./SkeletonSidebarUser";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  "& .MuiPaper-root": {
    top: "60px",
    height: "500px",
    boxShadow: "-2px 4px 4px 0px #00000040",
    borderRadius: "25px 0 0 25px",
    background: "#DFEEF7",
    padding: "10px 0px 10px 8px",
    overflow: "hidden",
  },
}));

export const QuickRabbitsSideList = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  const { data, isLoading, isFetching } = useGetStudentsQuery(
    { schoolId: schoolId as string },
    { skip: !schoolId }
  );
  console.log(data, isFetching, isLoading);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer variant="permanent" anchor="right" open={open}>
      <Stack direction="row">
        <Box>
          {!open ? (
            <IconButton onClick={handleDrawerOpen}>
              <KeyboardArrowLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <KeyboardArrowRightIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ pl: !open ? 2 : 0 }}>
          <Typography variant="h6">The Quick Rabbits</Typography>
          <Box sx={{ display: "flex" }}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: "#76DC37",
                  borderRadius: "50%",
                  mr: "5px",
                }}
              />
              <Typography variant="caption">{onlineUsers} Live</Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={3}>
              <Box
                sx={{
                  width: "5px",
                  height: "5px",
                  background: "#76DC37",
                  borderRadius: "50%",
                  mr: "5px",
                }}
              />
              <Typography variant="caption">1 Admin</Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Divider
        sx={{
          borderColor: "#fff",
          borderBottomWidth: "2px",
          mt: 1,
          width: "235px",
        }}
        flexItem
      />
      <List
        sx={(theme) => ({
          height: "100%",
          overflowX: "hidden",
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "3px",
            background: "transparent",
          },
          "::-webkit-scrollbar-track": {
            py: 1,
            width: "3px",
            background: theme.palette.primary,
          },
          "::-webkit-scrollbar-thumb": {
            width: "3px",
            background: "#C4C4C4",
            borderRadius: "3px",
          },
        })}
      >
        {isLoading
          ? [...Array(3)].map((el, i) => <SkeletonSidebarUser key={i + 5} />)
          : data?.data.map((student, i) => {
              if (student.active) {
                setOnlineUsers(onlineUsers + 1);
              }
              return (
                <SidebarUser
                  student={student}
                  key={i + student.id}
                  isLoading={isLoading}
                />
              );
            })}
      </List>
      <Divider
        sx={{ borderColor: "#fff", borderBottomWidth: "2px", width: "235px" }}
        flexItem
      />
      <List sx={{ py: 0 }}>
        <ListItem sx={{ py: 0.5 }}>
          <MarkUnreadChatAltIcon />
          <Box sx={{ pl: 2, pr: 3 }}>
            <Typography variant="h6">Group Chat</Typography>
          </Box>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          <NoteAltIcon />
          <Box sx={{ pl: 2, pr: 3 }}>
            <Typography variant="h6">Group Chat</Typography>
          </Box>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          <NewspaperIcon />
          <Box sx={{ pl: 2, pr: 3 }}>
            <Typography variant="h6">Group Chat</Typography>
          </Box>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
