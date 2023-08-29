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
    <Box sx={{ m: "0 auto" }}>
      <Tabs
        aria-label="lesson tabs"
        id="unit-page-tabs"
        indicatorColor="primary"
        className="smallSliderTour"
        onChange={(e, v) => {
          onChangeIndex(v);
        }}
        textColor="primary"
        value={index}
        sx={styles.Tabs}
        TabIndicatorProps={{ style: { background: "transparent" } }}
        scrollButtons={false}
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
          sx={index === 1 ? styles.activeTab : styles.Tab}
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
    backgroundColor: "rgba(21, 82, 117, 0.8)",
    borderRadius: "0 0 10px 10px",
    height: 25,
    minHeight: 0,

    "& .MuiTab-root": {
      minWidth: "0px",
    },
    "& .MuiTab-labelIcon .MuiTab-wrapper > *:first-of-type": {
      marginBottom: "0px",
    },
    "& .MuiTabs-flexContainer": {
      height: 25,
    },
  },
  Tab: {
    cursor: "pointer",
    color: "#43D4DD !important",
    "&.MuiTab-root": {
      minHeight: 0,
      padding: "0px 6px",
      margin: "0 !important",
    },
  },
  activeTab: {
    background: "#0000004D",
    borderRadius: "0px 0px 10px 10px",
    minHeight: "0px",
    minWidth: "90px !important",
    color: "#43D4DD !important",
    padding: "0px",
    margin: "0 !important",
    "& .MuiTab-wrapper": {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    "& .PrivateTabIndicator-colorPrimary-125": {
      backgroundColor: "transparent",
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
