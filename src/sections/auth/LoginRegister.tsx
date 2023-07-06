import { Logo } from "@components";
import LoginLayout from "@layouts/login/LoginLayout";
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
import RegisterCoderForm from "./RegisterCoderForm";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  isLogin: boolean;
}

export default function LoginRegister({ isLogin }: Props): React.ReactElement {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LoginLayout title="Hi, I’m Mumu." subtitle="So glad you’re here!">
      <Stack direction="column" sx={{ textAlign: "center" }}>
        <Logo
          sx={{
            m: "0px auto 30px",
          }}
        />
        <Typography variant="h5" gutterBottom>
          {isLogin ? "Welcome back!" : "Let’s register your account!"}
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

        <RegisterCoderForm isStudent={value === 0} isLogin={isLogin} />

        <Divider
          flexItem
          sx={{
            typography: "overline",
            color: "text.disabled",
            mt: 3,
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
          {isLogin ? "Login" : "Register"} with Google
        </Button>
        {!isLogin ? (
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
        ) : (
          <Typography sx={{ mt: "8px" }} variant="body2">
            First time here?
            <Link
              component={NextLink}
              href={PATH_AUTH.register}
              sx={{ ml: 1, color: "#02D3D7" }}
            >
              Register
            </Link>
          </Typography>
        )}
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
    </LoginLayout>
  );
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
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
