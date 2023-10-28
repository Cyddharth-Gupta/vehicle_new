import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ZoneInformationAdvance from "../Pages/ZoneInformationAdvance";
import ZoneInformationGeneral from "../Pages/ZoneInformationGeneral";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabsZoneInformation() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // Function to change the tab
  const changeTab = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-8">
      <Box sx={{ bgcolor: "transparent", width: "100%" }}>
        <AppBar
          position="static"
          sx={{ bgcolor: "transparent", width: "30%" }}
          elevation={0}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="General" {...a11yProps(0)} sx={{ marginLeft: 4 }} />
            <Tab
              label="Advanced"
              {...a11yProps(1)}
              sx={{ marginLeft: 4 }}
              disabled={value === 0}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ZoneInformationGeneral changeTabprop={changeTab} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ZoneInformationAdvance changeTabprop={changeTab} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
