import { useEffect, useState } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import { ApiEndpoints } from "./types";
import { fetchApiEndpoints } from "./services/api";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import Home from "./pages/Home/Home";
import { SelectChangeEvent } from "@mui/material/Select";
import Charts from "./pages/Charts/Charts";
import CustomAppBar from "./components/CustomAppBar/CustomAppBar";
export default function App() {
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoints | null>(null);
  const [selectedView, setSelectedView] = useState<string>("Table");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChartSelected, setIsChartSelected] = useState(false);
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);
  const handleSelectionChange = (event: SelectChangeEvent) => {
    setSelectedView(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchApiEndpoints()
      .then((data: ApiEndpoints) => {
        console.log("API endpoints:", data);
        setApiEndpoints(data);
      })
      .catch((error) => {
        console.error("Error fetching API endpoints:", error);
      });

  }, []);

  useEffect(() => {
    if(currentLocation === "/character-chart"){
      setIsChartSelected(true);
    }else{
      setIsChartSelected(false);
    }
  }, [currentLocation]);

  
  return (
    <>
      <CustomAppBar
        toggleDrawer={toggleDrawer}
        isChartSelected={isChartSelected}
        selectedView={selectedView}
        handleSelectionChange={handleSelectionChange}
      />
      
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        Link={Link}
        
      />

      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          maxWidth: "none",
        }}
       
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home apiEndpoints={apiEndpoints} selectedView={selectedView} />
            }
          />
          <Route
            path="/character-chart"
            element={<Charts episodeApi={apiEndpoints?.episodes} />}
          />
        </Routes>
      </Container>
    </>
  );
}
