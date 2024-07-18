import {useEffect,useState} from 'react';
import Container from '@mui/material/Container';
import { ApiEndpoints } from './types';
import { fetchApiEndpoints } from './services/api';
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function App() {
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoints | null>(null);
/**
 * fetch the app api in the first render
 */
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
    <Container >
       <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rick And Morty Characters App
          </Typography>
          <Button color="inherit">place holder for select component</Button>
        </Toolbar>
      </AppBar>
    
    </Container>
  );
}
