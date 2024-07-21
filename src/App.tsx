// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ApiEndpoints } from './types';
import { fetchApiEndpoints } from './services/api';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home/Home';
import Filters from './components/Filters/Filters';
import { SelectChangeEvent } from '@mui/material/Select';
import MyDrawer from './components/Drawer/MyDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Charts from './pages/Charts/Charts';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
export default function App() {
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoints | null>(null);
  const [selectedView, setSelectedView] = useState<string>('Table');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSelectionChange = (event: SelectChangeEvent) => {
    setSelectedView(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchApiEndpoints()
      .then((data: ApiEndpoints) => {
        console.log('API endpoints:', data);
        setApiEndpoints(data);
      })
      .catch((error) => {
        console.error('Error fetching API endpoints:', error);
      });
  }, []);

  return (
    <Router>
      <>
        <AppBar
          position="relative"
          sx={{ marginBottom: '10px', maxWidth: '100%' }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rick And Morty Characters App
            </Typography>
            <Filters
              selectedOption={selectedView}
              selectionOptions={['Table', 'Card']}
              onSelectionChange={handleSelectionChange}
              label={'View'}
              sx={{ marginTop: '10px' }}
              labelId='status-view-label'
              id='view-select'
            ></Filters>
          </Toolbar>
        </AppBar>
        
        <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
          <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              <ListItem  component={Link} to='/'>
                <ListItemIcon>
                  <HomeOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
              <ListItem  component={Link} to='/character-chart'>
                <ListItemIcon>
                  <BarChartOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary='Character Chart' />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        
        <Container
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'none',
          }}
          fixed={true}
        >
          <Routes>
            <Route path='/' element={<Home apiEndpoints={apiEndpoints} selectedView={selectedView} />} />
            <Route path='/character-chart' element={<Charts episodeApi={apiEndpoints?.episodes} />} />
          </Routes>
        </Container>
      </>
    </Router>
  );
}
