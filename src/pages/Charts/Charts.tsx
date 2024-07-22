import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Episode } from "../../types";
import { fetchAllData } from "../../services/api";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { isValidUrl } from "../../types/typeGuards";
const chartSetting = {
  colors: ["#538ccb"],
};

interface ChartsProp {
  episodeApi: string | undefined;
}

const Charts: React.FC<ChartsProp> = ({ episodeApi }) => {
  const [episodeData, setEpisodeData] = useState<
    Array<{ episode: string; charactersNumberInEpisode: number }>
  >([]);
  /**
   * get the screen size and determine the chart dimensions
   */
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

 
  const getChartDimensions = () => {
    if (isXs) return { width: 300, height: 300 };
    if (isSm) return { width: 400, height: 350 };
    if (isMd) return { width: 600, height: 400 };
    if (isLg) return { width: 800, height: 500 };
    return { width: 900, height: 600 };
  };
  /**
   * based on the chart dimensions adjust the font size
   * 
   */
  const getFontSize = () => {
    if (isXs) return 7;
    if (isSm) return 8;
    if (isMd) return 9;
    if (isLg) return 10;
    return 11;
  };
  /**
   * fetch all the episodes and the amount of characters in each episode
   */
  useEffect(() => {
    if (isValidUrl(episodeApi)) {
      fetchAllData<Episode>(episodeApi).then((result) => {
        if (result) {
          const episodes = result.map((episode) => ({
            episode: episode.episode,
            charactersNumberInEpisode: episode.characters.length,
          }));
          setEpisodeData(episodes);
        }
      });
    }
  }, [episodeApi]);

  const { width, height } = getChartDimensions();
  const fontSize = getFontSize();

  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <BarChart
        width={width}
        height={height}
        data={episodeData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={{ fontSize: fontSize }}
        />
        <YAxis
          dataKey="episode"
          type="category"
          interval={0}
          tick={{ fontSize: fontSize }}
        />
        <Tooltip
          contentStyle={{ fontSize: fontSize }}
        />
        <Legend
          wrapperStyle={{ fontSize: fontSize }}
        />
        <Bar
          dataKey="charactersNumberInEpisode"
          fill={chartSetting.colors[0]}
        />
      </BarChart>
    </Box>
  );
};

export default Charts;
