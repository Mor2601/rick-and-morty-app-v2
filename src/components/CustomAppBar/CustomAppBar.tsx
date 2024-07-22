import React from "react";
import { SelectChangeEvent, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import Filters from "../Filters/Filters";
import MenuIcon from "@mui/icons-material/Menu";
interface CustomAppBarProps {
  toggleDrawer: () => void;
  isChartSelected: boolean;
  selectedView: string;
  handleSelectionChange: (event: SelectChangeEvent) => void;
}
const CustomAppBar: React.FC<CustomAppBarProps> = ({
  toggleDrawer,
  isChartSelected,
  selectedView,
  handleSelectionChange
}) => {
  return <AppBar position="relative" sx={{
    marginBottom: "10px",
    maxWidth: "100%"
  }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{
        mr: 2
      }} onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{
        flexGrow: 1
      }}>
          Rick And Morty Characters App
        </Typography>
        {!isChartSelected ? <Filters selectedOption={selectedView} selectionOptions={["Table", "Card"]} onSelectionChange={handleSelectionChange} label={"View"} sx={{
        marginTop: "10px"
      }} labelId="status-view-label" id="view-select"></Filters> : null}
      </Toolbar>
    </AppBar>;
};
export default CustomAppBar;