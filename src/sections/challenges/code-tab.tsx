import { useState } from "react";

import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Container, Tab, Typography } from "@mui/material";

export default function CodeTab(): React.ReactElement {
  const [value, setValue] = useState("1");
  const handleChangeValue = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ height: "100%" }}>
        <TabContext value={value}>
          <TabList
            sx={{
              padding: 0,
              minHeight: "10px",
              "& .MuiButtonBase-root": {
                height: "20px",
                minHeight: "auto",
                minWidth: "100px",
                padding: 1.5,
                border: "1px solid #364954",
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                marginRight: "0!important",
              },
              "& .Mui-selected": {
                background: "#364954",
                color: "#ffffff",
              },
            }}
            TabIndicatorProps={{ style: { width: 0 } }}
            onChange={handleChangeValue}
          >
            <Tab label="Code" value="1" />
            <Tab label="Another code" value="2" />
          </TabList>
          <TabPanel
            sx={{
              height: "100%",
              backgroundColor: "#364954",
              padding: 1,
            }}
            value="1"
          >
            <Box
              sx={{
                height: "100%",
              }}
            >
              <Typography color="white" variant="body2">
                code code code
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel
            sx={{
              height: "100%",
              backgroundColor: "#364954",
              padding: 1,
            }}
            value="2"
          >
            <Box>
              <Typography color="white" variant="body2">
                code second second code code
              </Typography>
            </Box>
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
