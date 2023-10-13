import { type FC } from 'react'
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import { Iconify } from "@components";
import { voidFunction } from "@utils";

import { styles } from './styles'

interface ISmallScreenTabs {
  index: number;
  onChangeIndex: (v: number) => void;
}

const SmallScreenTabs: FC<ISmallScreenTabs> = ({
  index,
  onChangeIndex,
}) => {
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
        TabIndicatorProps={TAB_INDICATOR_PROPS}
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

const TAB_INDICATOR_PROPS = {
  style: {
    background: "transparent"
  }
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default SmallScreenTabs;
