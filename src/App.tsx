import React from "react";

import { Box, Tab, Tabs } from "@mui/material";

import LogViewer from "./LogViewer";
import TabPanel from "./TabPanel";

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Log Viewer" />
            <Tab label="Buy/Sell Viewer" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <LogViewer />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </header>
    </div>
  );
};

export default App;
