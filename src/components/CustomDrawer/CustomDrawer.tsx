import React from "react";
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { LinkProps } from "react-router-dom";
interface CustomDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>
}
const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isDrawerOpen,
  toggleDrawer,
  Link,
  
}) => {
  return <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
      <Box sx={{
      width: 250
    }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        <List>
          <ListItem component={Link} to="/" >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/characters-chart">
            <ListItemIcon>
              <BarChartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Character Chart" />
          </ListItem>
        </List>
      </Box>
    </Drawer>;
};
  
export default CustomDrawer;