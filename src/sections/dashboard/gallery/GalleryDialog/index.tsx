import React, { useEffect, useState } from "react";

import { BiSave } from "react-icons/bi";
import { BsArrowsFullscreen } from "react-icons/bs";
import { HiCode, HiOutlineDesktopComputer } from "react-icons/hi";
import { TbArrowsMinimize } from "react-icons/tb";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  IconButton,
  Stack,
  Tab,
  Tabs,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import BrowserTab from "../BrowserTab";
import GalleryCodeTab from "../GalleryCodeTab";
import ModalFooter from "../ModalFooter";
import { ArrowLeft, ArrowRight } from "./navigation";

interface Props {
  children?: React.ReactElement;
  name: string;
  lastName: string;
  title: string;
  code: string;
  setCode: (value: string) => void;
  onUpdate: () => Promise<void>;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: Record<string, unknown>;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}
export default function GalleryDialog({
  children,
  title,
  name,
  lastName,
  code,
  setCode,
  onUpdate,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const [open, setOpen] = useState<boolean>(false);
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isMobile) {
      setFullWidth(true);
    }
  }, []);

  const handleClickOpen = (): void => {
    if (fullWidth) {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }
    setOpen(true);
  };

  const handleClickClose = (): void => {
    if (fullWidth) {
      document.getElementsByTagName("body")[0].style.removeProperty("overflow");
    }
    setOpen(false);
  };
  const handleChangeWidth = (): void => {
    if (!fullWidth) {
      document.getElementsByTagName("body")[0].style.removeProperty("overflow");
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }
    if (fullWidth) {
      document.getElementsByTagName("body")[0].style.removeProperty("overflow");
    }
    setFullWidth(!fullWidth);
  };
  return (
    <>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClickClose}
        hideBackdrop
        disableScrollLock
        sx={{
          "& .MuiDialog-container": {
            width: "100%",
          },
          position: "fixed",
          top: fullWidth ? "0" : "80px",
          right: "0",
          left: "auto",
          width: fullWidth ? "100vw" : "500px",
          border: fullWidth ? "none" : "2px solid #D9D9E2",
          height: fullWidth ? "100vh" : "calc(100vh - 160px)",
          borderRadius: fullWidth ? "0" : "16px",
          overflow: "hidden",
        }}
        PaperProps={{
          square: true,
          sx: {
            m: 0,
            width: "100%",
            minWidth: fullWidth ? "100%" : "auto",
            maxHeight: "100%",
            height: "100%",
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <IconButton sx={{ mt: 0.5 }} onClick={onUpdate}>
            <BiSave size="22px" color="#75CF6D" />
          </IconButton>
          <Tabs
            TabIndicatorProps={{
              sx: {
                height: "90%",
                opacity: 0.2,
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              },
            }}
            sx={{
              "& .MuiTabs-scroller": {
                flex: "0 auto",
                m: "0 auto",
                height: "40px",
              },
              "& button": { minHeight: "45px" },
              minHeight: "30px",
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs project dialog"
          >
            <Tab
              {...a11yProps(0)}
              icon={<HiOutlineDesktopComputer size="20px" />}
              label="Browser"
              sx={{ marginRight: "0!important", px: "10px" }}
            />
            <Tab
              {...a11yProps(1)}
              icon={<HiCode size="20px" />}
              label="Code"
              sx={{ px: "10px" }}
            />
          </Tabs>
          <IconButton sx={{ mt: 0.5 }} onClick={handleClickClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <TabPanel value={value} index={0} sx={{ height: "calc(100% - 125px)" }}>
          <BrowserTab code={code} />
        </TabPanel>

        <TabPanel value={value} index={1} sx={{ height: "calc(100% - 125px)" }}>
          <GalleryCodeTab code={code} setCode={setCode} />
        </TabPanel>

        <ArrowLeft setValue={setValue} value={value} />
        <ArrowRight setValue={setValue} value={value} />
        <ModalFooter
          name={name}
          lastName={lastName}
          title={title}
          fullWidth={fullWidth}
        />
        {!isMobile ? (
          <Box
            sx={{
              position: "absolute",
              top: "60px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: alpha("#43D4DD", 0.3),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleChangeWidth}>
              {fullWidth ? (
                <TbArrowsMinimize size="20px" />
              ) : (
                <BsArrowsFullscreen size="20px" />
              )}
            </IconButton>
          </Box>
        ) : null}
      </Dialog>
    </>
  );
}
