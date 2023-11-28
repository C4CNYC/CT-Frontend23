import { useState } from "react";

import { BsBookmarkCheckFill } from "react-icons/bs";

import {
  Box,
  Button,
  Collapse,
  Tab,
  Tabs,
  Theme,
  alpha,
  useTheme,
} from "@mui/material";

interface ICreatePaletteProps {
  choosenColor: string;
  setChoosenColor: (c: string) => void;
}

export default function CreatePalette({
  choosenColor,
  setChoosenColor,
}: ICreatePaletteProps): React.ReactElement {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", pt: 2, px: { xs: 1, sm: 2, md: 3 } }}>
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
          sx={{
            gap: 2,
            py: 2,
            px: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
          }}
        >
          {CLASS_PALETTE.map((el) => (
            <Button
              onClick={() => {
                setChoosenColor(el);
              }}
              sx={(theme: Theme) => ({
                borderRadius: 2,
                border:
                  choosenColor === el
                    ? `3px solid ${theme.palette.secondary.main}`
                    : "none",
                width: "100%",
                maxWidth: "250px",
                height: { xs: "100px", sm: "130px" },
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
  "#3d1e6d",
  "#ffdd56",
  "#ff6f69",
  "#e9b341",
  "#2e003e",
  "#854442",
  "#3c2f2f",
  "#068FFF",
  "#67dbe6",
  "#3d2352",
  "#ff77aa",
  "#76b4bd",
  "#58668b",
  "#116530",
  "#ff99cc",
  "#8874a3",
  "#F94C10",
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const theme = useTheme();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box
        sx={{
          maxHeight: "460px",
          overflowY: "auto",
          overflowX: "none",
          scrollbarWidth: "2px",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.grey[600], 0.48),
            borderRadius: "2px",
          },
        }}
      >
        {value === index && children}
      </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
