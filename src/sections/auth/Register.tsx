import { Logo } from "@components";
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PATH_AUTH } from "@routes/paths";
import NextLink from "next/link";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoFileCode } from "react-icons/go";
import SwipeableViews from "react-swipeable-views";
import RegisterForm from "./RegisterForm";

export default function Register(): React.ReactElement {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Stack
      direction="column"
      sx={{
        textAlign: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo
        sx={{
          m: "0px auto 30px",
        }}
      />
      <Typography variant="h5" gutterBottom>
        Let’s register your account!
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          boxShadow: 3,
          borderRadius: 4,
          mt: 2,
          mb: 3,
          p: "2px",
          color: "#02D3D7",
        }}
        TabIndicatorProps={{
          sx: {
            background: "#02D3D714",
            height: "100%",
            borderRadius: 4,
          },
        }}
        scrollButtons={false}
      >
        <Tab
          {...a11yProps(0)}
          label="I'm a Coder"
          icon={<GoFileCode size={20} />}
          sx={{
            p: 2,
            borderRadius: 4,
            textTransform: "none",
            "&.MuiTab-root": { m: 0, width: "50%" },
          }}
        />
        <Tab
          {...a11yProps(1)}
          label="I'm a Teacher"
          icon={<FaGraduationCap size={20} />}
          sx={{
            p: 2,
            borderRadius: 4,
            textTransform: "none",
            "&.MuiTab-root": { m: 0, width: "50%" },
          }}
        />
      </Tabs>

      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <RegisterForm isStudent={true} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterForm isStudent={false} />
        </TabPanel>
      </SwipeableViews>
      <Divider
        flexItem
        sx={{
          typography: "overline",
          color: "text.disabled",
          mt: 1,
        }}
      >
        OR
      </Divider>
      <Button
        sx={{
          width: "100%",
          py: "15px",
          color: "#000",
          border: "1px solid #919EAB52",
          borderRadius: "100px",
          mt: "24px",
          mb: "40px",
        }}
      >
        <Box sx={{ mr: "15px", height: "20px" }}>
          <FcGoogle size="20px" />
        </Box>
        Register with Google
      </Button>

      <Typography variant="subtitle2">
        I’ve been here before.
        <Link
          component={NextLink}
          href={PATH_AUTH.login}
          sx={{ ml: 1, color: "#02D3D7" }}
        >
          Let me Login
        </Link>
      </Typography>

      <Typography
        variant="caption"
        sx={{
          position: { xs: "initial", sm: "fixed" },
          bottom: "32px",
          pt: { xs: "10px", sm: "0" },
        }}
      >
        Copyright CodeTribe 2022 © All rights reserved.
      </Typography>
    </Stack>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack
          sx={{ px: 1, pb: 2, minHeight: "364px", justifyContent: "center" }}
        >
          {children}
        </Stack>
      )}
    </div>
  );
}
