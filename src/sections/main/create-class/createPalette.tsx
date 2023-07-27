import { useState } from "react";

import { BsBookmarkCheckFill } from "react-icons/bs";

import { Box, Button, Collapse, Tab, Tabs } from "@mui/material";

interface Props {
  choosenColor: string;
  setChoosenColor: (c: string) => void;
}

export default function CreatePalette({
  choosenColor,
  setChoosenColor,
}: Props): React.ReactElement {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", pt: 2, px: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#43D4DD",
            },
          }}
        >
          <Tab label="Featured" {...a11yProps(0)} sx={{ fontSize: "1.2rem" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          gap={2}
          p={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(3, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
        >
          {/* change to btn */}
          {CLASS_PALETTE.map((el) => (
            <Button
              onClick={() => {
                setChoosenColor(el);
              }}
              sx={(theme) => ({
                borderRadius: 2,
                border:
                  choosenColor === el
                    ? `3px solid ${theme.palette.secondary.main}`
                    : "none",
                width: "100%",
                maxWidth: "250px",
                height: "130px",
                position: "relative",
                background: el,
                "&:hover": {
                  background: el,
                },
              })}
              key={el}
            >
              <Box
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  mb: "auto",
                  mr: "auto",
                })}
              >
                <Collapse in={choosenColor === el}>
                  <BsBookmarkCheckFill size={30} color="inherit" />
                </Collapse>
              </Box>
            </Button>
          ))}
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export const CLASS_PALETTE = [
  "#96ceb4",
  "#ffeead",
  "#ff6f69",
  "#ffcc5c",
  "#854442",
  "#fff4e6",
  "#3c2f2f",
  "#ebf4f6",
  "#bdeaee",
  "#76b4bd",
  "#58668b",
  "#ff77aa",
  "#ff99cc",
  "#ffbbee",
  "#2e003e",
  "#3d2352",
  "#3d1e6d",
  "#8874a3",
  "#e4dcf1",
];

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
