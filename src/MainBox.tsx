import React from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TokenHolderList from "../components/TokenHolderList";
import TransferHistory from "../components/TransferHistory";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { startApp } from "./utils/apiRoutes";
import MyButton from "../components/MyButton";
import { useAppContext } from "../context";
import MyPage from "../components/MyPage";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function MainBox() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { getHistoryFunc, getAccountsFunc, appStatus } = useAppContext();

  const startAppFunc = async () => {
    try {
      const { data } = await axios.post(startApp);
      setMessage("App started!")
      setOpen(true);
    } catch (error) {

    }
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <MyButton onClick={startAppFunc}>Start Backend app</MyButton>
        <MyButton onClick={() => getHistoryFunc()}>Get latest history</MyButton>
        <MyButton onClick={getAccountsFunc}>Get latest Accounts Info</MyButton>
        <br />
        <div style={{ margin: 10 }}>
          {appStatus.isMigrating && "Migrating...  "}
          {appStatus.elapsedTime + "min... "}
          {appStatus.percent + "%...  "}
          {appStatus.isListening && "Listening Event...  "}
          {"LatestBlockNumber: " + appStatus.latestBlockNumber}
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="My Page" {...a11yProps(0)} />
            <Tab label="Transfer History" {...a11yProps(1)} />
            <Tab label="Token Holers" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MyPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TransferHistory />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TokenHolderList />
        </TabPanel>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar >
      </Box>
    </div>
  )
}
