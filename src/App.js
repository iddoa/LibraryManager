import './App.css';
import React from 'react';
import VerticalTabs from './components/TabPanel';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Library
                </Typography>
            </Toolbar>
        </AppBar>
        <VerticalTabs />
    </div>
  );
}

export default App;
