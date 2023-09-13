import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useSelector } from "react-redux";

import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";
import { useRealTimeConnection } from "@hooks";
import { MANAGER_PATH_DASHBOARD } from "@routes/manager.paths";
import { Messages } from "@sections/teacher-panel/quick-rabbits/quick-rabbits-item/message";
import { useGetStudentsQuery } from "src/redux/services/manager/students-manager";
import { RootState } from "src/redux/store";

import { GROUP_CHAT_RABBIT } from "../quick-rabbits-side-list";

interface IQuickRabbitsItem {
  rabit: { id: string, email: string, avatar: string };
  onClose: (userId: string) => void;
}

enum TabbitView {
  CHAT = "chat",
  CODE = "code",
}

export default function QuickRabbitsItem({
  rabit,
  onClose,
}: IQuickRabbitsItem): React.ReactElement | null {
  const { query } = useRouter();
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  
  const [view, setView] = useState<TabbitView>(
    rabit.email === GROUP_CHAT_RABBIT ? TabbitView.CHAT : TabbitView.CODE
  );

  const { data: realTimeData } = useRealTimeConnection(rabit.id);
  
  const { data: students } = useGetStudentsQuery(
    {
      schoolId,
      class_id: query?.id as string,
    },
    { skip: !query?.id }
  );

  const isRabbitActive = rabit?.id === query?.id;

  if (!rabit) return null;

  return (
    <Box
      height="469px"
      width="350px"
      border="1px solid #cbcccb"
      borderRadius="15px"
      overflow="hidden"
      bgcolor="#364954"
    >
      <Box
        bgcolor="rgba(120, 56, 121, 0.7)"
        height="35px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        alignContent="center"
        p="5px 6px 4px 10px"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Link
            replace
            shallow
            href={
              MANAGER_PATH_DASHBOARD.school.controller(query.id as string) +
              (!isRabbitActive ? `?studentId=${rabit.id}` : "")
            }
          >
            {rabit.email === GROUP_CHAT_RABBIT ? null : (
              <IconButton>
                <Iconify
                  icon={
                    isRabbitActive
                      ? "majesticons:door-exit-line"
                      : "majesticons:door-enter-line"
                  }
                  color={isRabbitActive ? "red" : "#EAEAEB"}
                />
              </IconButton>
            )}
          </Link>
          <Tooltip title={rabit.email} placement="top">
            <Typography noWrap width="160px" color="#EAEAEB" ml="5px">
              {rabit.email}
            </Typography>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          {rabit.email === GROUP_CHAT_RABBIT ? null : (
            <>
              <IconButton
                onClick={() => {
                  setView(TabbitView.CODE);
                }}
              >
                <Iconify icon="material-symbols:code" color="#EAEAEB" />
              </IconButton>
              <IconButton
                onClick={() => {
                  setView(TabbitView.CHAT);
                }}
              >
                <Iconify icon="basil:chat-outline" color="#EAEAEB" />
              </IconButton>
            </>
          )}

          <IconButton
            onClick={() => {
              onClose(rabit.id);
            }}
          >
            <Iconify icon="material-symbols:close-rounded" color="#EAEAEB" />
          </IconButton>
        </Box>
      </Box>
      {view === TabbitView.CHAT ? (
        <Messages
          getStudent={(id: string) => {
            return students?.data.find((s) => s.id === id);
          }}
          reciverId={rabit.id}
        />
      ) : (
        <CodeMirror
          editable={false}
          value={realTimeData?.code}
          theme={myTheme}
          height="449px"
          style={{ fontSize: 11, overflow: "scroll" }}
          placeholder="<Code for boxes appear...>"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          extensions={[loadLanguage("html")]}
        />
      )}
    </Box>
  );
}

const myTheme = createTheme({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  lineWrapping: true,
  dark: "dark",
  settings: {
    background: "#364954",
    foreground: "#EAEAEB",
    caret: "#EAEAEB",
    selection: "",
    selectionMatch: "#364954",
    gutterBackground: "#364954",
    gutterForeground: "#fff",
    gutterBorder: "#364954",
    gutterActiveForeground: "",
    lineHighlight: "#364954",
  },
});
