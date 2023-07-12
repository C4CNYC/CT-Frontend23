import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";
import { voidFunction } from "@utils";

interface ISmallScreenTabs {
  index: number;
  onChangeIndex: (v: number) => void;
}

const SmallScreenTabs = ({
  index,
  onChangeIndex,
}: ISmallScreenTabs): React.ReactElement => {
  return (
    <Box>
      <Tabs
        aria-label="lesson tabs"
        id="unit-page-tabs"
        indicatorColor="primary"
        onChange={(e, v) => {
          onChangeIndex(v);
        }}
        textColor="primary"
        value={index}
        sx={styles.Tabs}
        TabIndicatorProps={{ style: { background: "transparent" } }}
      >
        <Tab
          {...a11yProps(0)}
          onClick={voidFunction}
          aria-label="Lesson"
          icon={<Iconify icon="material-symbols:play-lesson-outline" />}
          sx={index === 0 ? styles.activeTab : styles.Tab}
          label={index === 0 ? <div style={styles.slides}>Slides</div> : ""}
        />
        <Tab
          {...a11yProps(1)}
          aria-label="Code"
          icon={<Iconify icon="material-symbols:code" />}
          sx={index === 1 ? styles.activeTabEditor : styles.Tab}
          label={index === 1 ? <div style={styles.slides}>Editor</div> : ""}
        />
        <Tab
          {...a11yProps(0)}
          aria-label="Preview"
          icon={<Iconify icon="material-symbols:desktop-windows-outline" />}
          sx={index === 2 ? styles.activeTab : styles.Tab}
          label={index === 2 ? <div style={styles.slides}>Browser</div> : ""}
        />
      </Tabs>
    </Box>
  );
};

const styles = {
  Tabs: {
    backgroundColor: "#EBEDEE",
    borderRadius: "10px",
    height: 39,
    minHeight: 0,
    "& .MuiTab-root": {
      minWidth: "0px",
    },
    "& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child": {
      marginBottom: "0px",
    },
    "& .MuiTabs-flexContainer": {
      height: 39,
    },
  },
  Tab: {
    cursor: "pointer",
    "&.MuiTab-root": {
      minHeight: 0,
      padding: "6px 12px",
      margin: "0 !important",
    },
  },
  activeTab: {
    background: "#364954",
    borderRadius: "10px",
    minHeight: "0px",
    minWidth: "110px !important",
    color: "#ffff !important",
    padding: "0px",
    margin: "0 !important",
    "& .MuiTab-wrapper": {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    "& .PrivateTabIndicator-colorPrimary-125": {
      backgroundColor: "transparent",
    },
    "@media (min-width:530px)": {
      minWidth: "160px !important",
    },
  },
  activeTabEditor: {
    background: "#32502D",
    borderRadius: "10px 10px 0px 0px",
    minHeight: "0px",
    minWidth: "110px !important",
    margin: "0 !important",
    color: "#ffff !important",
    "& .MuiTab-wrapper": {
      display: "flex",
      flexDirection: "row",
    },
    "@media (min-width:530px)": {
      minWidth: "160px !important",
    },
  },
  slides: {
    fontSize: 12,
  },
};

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default SmallScreenTabs;
