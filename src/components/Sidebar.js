import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import PolicyIcon from '@mui/icons-material/Policy';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import DashBoard from '../components/DashBoard';
import Payment from '../components/Payment';
import Claims from '../components/Claims';
import Policy from './Policy';
import Navbar from '../components/Navbar';

const drawerWidth = 240;

const menuItems = [
  { id: 'dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
  { id: 'payment', icon: <PaidIcon />, text: 'Payments' },
  { id: 'claims', icon: <ContentPasteGoIcon />, text: 'Claims' },
  { id: 'policy', icon: <PolicyIcon />, text: 'Policy' }
];

function Sidebar() {

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    if (selectedComponent === 'dashboard') {
      return (
        <>
          {/*  */}
          <DashBoard />
        </>
      );
    } else if (selectedComponent === 'payment') {
      return <Payment />;
    } else if (selectedComponent === 'claims') {
      return <Claims />;
    } else if (selectedComponent === 'policy') {
      return (<Policy />)
    }

    return (        
    <>
      <DashBoard />
    </>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Navbar />
        </AppBar>
        <Drawer
          sx={{width: drawerWidth,flexShrink: 0,'& .MuiDrawer-paper': {width: drawerWidth,boxSizing: 'border-box',},}}
          variant="permanent" anchor="left" >
          <Toolbar />

          <Divider />

          <List>
            {menuItems.map((item) => (
              <ListItem disablePadding key={item.id}>
                <ListItemButton onClick={() => handleComponentClick(item.id)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {['Support'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <SupportAgentIcon /> : <SupportAgentIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, rowGap: 3 }}>
          {renderComponent()}
        </Box>
      </Box>
    </>
  );
}
export default Sidebar;