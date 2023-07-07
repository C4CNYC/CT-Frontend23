import { Iconify } from "@components";
import { Button, Link, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { PATH_DASHBOARD } from "@routes/paths";
import { useState } from "react";
import { CiMountain1, CiShare1 } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import CardCourse from "./quest-card";

export default function QuestsTable() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack sx={{ px: 2, pt: 1 }}>
      <Stack direction="row" alignItems="center" pb={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#43D4DD",
            },
          }}
        >
          <Tab
            label="Quests"
            icon={<CiMountain1 size={20} />}
            {...a11yProps(0)}
            sx={{ fontSize: "1.1rem" }}
          />
          <Tab
            label="21 Members"
            icon={<IoPeopleOutline size={20} />}
            sx={{ fontSize: "1.1rem" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Details"
            icon={<IoSettingsOutline size={20} />}
            sx={{ fontSize: "1.1rem" }}
            {...a11yProps(2)}
          />
        </Tabs>
        <Stack
          direction="row"
          sx={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            noWrap
            href={PATH_DASHBOARD.gallery.root}
            variant="body2"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "inherit",
            }}
          >
            <Iconify
              icon="solar:gallery-wide-broken"
              width={20}
              sx={{ ml: 5 }}
            />
            <Typography color="#637381" fontSize="1.1rem" mr="10px">
              Gallery
              <CiShare1 size={15} style={{ margin: "0 0 3px 3px" }} />
            </Typography>
          </Link>
          <Button sx={(theme) => ({ gap: 1 })} variant="outlined" color="info">
            <FaPlus size={15} style={{ marginBottom: "2px" }} />
            Add Quest
          </Button>
        </Stack>
      </Stack>
      <CustomTabPanel value={value} index={0}>
        <CardCourse />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}></CustomTabPanel>
    </Stack>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
