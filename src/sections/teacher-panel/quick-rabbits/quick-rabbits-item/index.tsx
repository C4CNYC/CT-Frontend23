import Iconify from "@components/iconify";
import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Messages } from "@sections/teacher-panel/message";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function QuickRabbitsItem(): React.ReactElement {
  const [valueCode, setValueCode] = useState<string>("");
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const myTheme = createTheme({
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

  return (
    <Box
      height="369px"
      border="1px solid #cbcccb"
      borderRadius="15px"
      overflow="hidden"
      bgcolor="#364954"
    >
      <Box
        bgcolor="rgba(121, 56, 56, 0.8)"
        height="35px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="5px 6px 4px 10px"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography color="#EAEAEB" pt="10px" mr="175px">
            Header
          </Typography>
          <Tabs value={value} onChange={handleChange} indicatorColor="#364954">
            <Tab
              icon={<Iconify icon="material-symbols:chat" color="#EAEAEB" />}
              {...a11yProps(0)}
              style={{ marginRight: "-10px" }}
            ></Tab>
            <Tab
              icon={
                <Iconify icon="majesticons:door-enter-line" color="#EAEAEB" />
              }
              {...a11yProps(1)}
              style={{ marginRight: "-10px" }}
            />
            <Tab
              icon={<Iconify icon="fluent:code-16-filled" color="#EAEAEB" />}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <Iconify
          icon="material-symbols:close-rounded"
          width={24}
          color="#EAEAEB"
        />
      </Box>
      <TabPanel value={value} index={1}>
        <Messages />
      </TabPanel>
      <Box width="450px" height="317px" ml="-20px">
        <TabPanel value={value} index={2}>
          <CodeMirror
            value={valueCode}
            theme={myTheme}
            height="calc(100vh - 48px)"
            placeholder="<CSS for boxes appear...>"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            extensions={[loadLanguage("html")]}
            onChange={(value) => {
              setValueCode(value);
            }}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}
