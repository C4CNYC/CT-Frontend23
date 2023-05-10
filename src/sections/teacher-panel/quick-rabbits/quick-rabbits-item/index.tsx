import Iconify from "@components/iconify";

import { useRealTimeConnection } from "@hooks/useRealTimeConnection";
import { IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PATH_DASHBOARD } from "@routes/paths";
import { onlineStudentsAtom } from "@sections/teacher-panel/atoms/online-students.atom";
import { IQuickRabbit } from "@sections/teacher-panel/atoms/quick-rabbit.atom";
import { Messages } from "@sections/teacher-panel/quick-rabbits/quick-rabbits-item/message";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IQuickRabbitsItem {
  rabit: IQuickRabbit;
  onClose: (userId: string) => void;
}

export default function QuickRabbitsItem({
  rabit,
  onClose,
}: IQuickRabbitsItem): React.ReactElement | null {
  const { query } = useRouter();
  const { data } = useRealTimeConnection(rabit.id);
  const [value, setValue] = useState(1);
  const [onlineStudents] = useAtom(onlineStudentsAtom);

  useEffect(() => {
    if (!onlineStudents) return;
    if (!onlineStudents[rabit.id]) onClose(rabit.id);
  }, [onlineStudents])

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const myTheme = createTheme({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dark: "dark",
    settings: {
      background: "#364954",
      foreground: "#EAEAEB",
      caret: "#EAEAEB",
      selection: "",
      selectionMatch: "#364954",
      gutterBackground: "#364954",
      gutterForeground: "#364954",
      gutterBorder: "#364954",
      gutterActiveForeground: "",
      lineHighlight: "#364954",
    },
  });

  const isRabbitActive = rabit.id === query.studentId;

  if (!rabit) return null;

  return (
    <Box
      height="469px"
      border="1px solid #cbcccb"
      borderRadius="15px"
      overflow="hidden"
      bgcolor="#364954"
      minWidth="300px"
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
            href={
              PATH_DASHBOARD.school.controller(query.id as string) +
              (!isRabbitActive ? `?studentId=${rabit.id}` : "")
            }
          >
            <IconButton>
              <Iconify icon={isRabbitActive ? "majesticons:door-exit-line" : "majesticons:door-enter-line"} color={isRabbitActive ? "red" : "#EAEAEB"} />
            </IconButton>
          </Link>
          <Tooltip title={rabit.email} placement="top">
            <Typography noWrap width="110px" color="#EAEAEB" ml="5px">
              {rabit.email}
            </Typography>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" >
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab
              icon={<Iconify icon="material-symbols:chat" color="#EAEAEB" />}
              {...a11yProps(0)}
              style={{ marginRight: "-10px" }}
            ></Tab>
            <Tab
              icon={<Iconify icon="fluent:code-16-filled" color="#EAEAEB" />}
              {...a11yProps(1)}
            />
          </Tabs>
          <IconButton
            onClick={() => {
              onClose(rabit.id);
            }}
          >
            <Iconify icon="material-symbols:close-rounded" color="#EAEAEB" />
          </IconButton>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <Messages reciverId={rabit.id} />
      </TabPanel>
      <Box height="317px" ml="-20px">
        <TabPanel value={value} index={1}>
          <CodeMirror
            editable={false}
            value={data?.code}
            theme={myTheme}
            height="calc(100vh - 48px)"
            placeholder="<Code for boxes appear...>"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            extensions={[loadLanguage(data?.language ?? "html")]}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
