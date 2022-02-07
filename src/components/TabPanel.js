import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserManager from "./UserManager";
import ConstructionIcon from '@mui/icons-material/Construction';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            style={{width: "100%"}}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
                {children}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const underConstrunction =
        <Typography variant="h1" component="h1"
           style={{
               position: "absolute",
               top: "50%", left:"50%",
               transform: "translate(-50%, -50%)",
               marginRight: "-50%"}}
        >
            <ConstructionIcon fontSize="inherit"/>
            Under Construction
        </Typography>;

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
            style={{height: "100%"}}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
                style={{height: "100%"}}
            >
                <Tab label="Manage Users" {...a11yProps(0)} />
                <Tab label="Manage Books" {...a11yProps(1)} />
                <Tab label="Manage Authors" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <UserManager />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {underConstrunction}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {underConstrunction}
            </TabPanel>
        </Box>
    );
}
