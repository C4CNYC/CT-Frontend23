import { useRouter } from "next/router";
import { useState } from "react";

import { useAtom } from "jotai";
import { useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import { Box } from "@mui/system";

import { onlineStudentsAtom } from "@sections/teacher-panel/atoms/online-students.atom";

import { SidebarUser } from "./SidebarUser";
import { SkeletonSidebarUser } from "./SkeletonSidebarUser";
import { createRabit } from "src/redux/slices/rabits";
import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";
import { useRoomActivity } from "@hooks";

const drawerWidth = 250;
export const GROUP_CHAT_RABBIT = "Group Chat";

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
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [onlineStudents] = useAtom(onlineStudentsAtom);

  const { getActivityStatus } = useRoomActivity("all");

  console.log({ getActivityStatus });

  const classId: string = query.id as string;
  const { data, isLoading, isFetching } = useGetClassStudentsQuery(
    { id: query.id as string },
    { skip: !query.id }
  );

  return (
    <Drawer variant="permanent" anchor="right" open={open}>
      <Stack direction="row">
        <Box>
          {!open ? (
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
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
              <Typography variant="caption">
                {
                  Object.keys(onlineStudents).filter((id) => onlineStudents[id])
                    .length
                }{" "}
                Live
              </Typography>
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
        {isLoading || isFetching
          ? [...Array(3)].map((el, i) => <SkeletonSidebarUser key={i + 5} />)
          : data?.data.map((student, i) => {
            return (
              <SidebarUser
                status={getActivityStatus(student.account.id)}
                student={student}
                key={i.toString() + student.id}
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
            <Typography variant="h6">{GROUP_CHAT_RABBIT}</Typography>
          </Box>
          <IconButton>
            <AddIcon
              onClick={() => {
                dispatch(createRabit({
                  id: classId,
                  email: GROUP_CHAT_RABBIT,
                  avatar:
                    "https://cdn3.iconfinder.com/data/icons/communication-media-malibu-vol-1/128/group-chat-1024.png",
                }))
              }}
            />
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
