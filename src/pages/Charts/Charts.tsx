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

const chartSetting = {
  width: 900,
  height: 800,
  colors: ["#538ccb"],
};

interface ChartsProp {
  episodeApi: string | undefined;
}
const Charts: React.FC<ChartsProp> = ({ episodeApi }) => {
  const [episodeData, setEpisodeData] = useState<
    Array<{ episode: string; charactersNumberInEpisode: number }>
  >([]);

  useEffect(() => {
    if (episodeApi) {
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

  return (
    <BarChart
      width={chartSetting.width}
      height={chartSetting.height}
      data={episodeData}
      layout="vertical" // Set layout to vertical
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="episode" type="category" interval={0} />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="charactersNumberInEpisode"
        fill={chartSetting.colors[0]}
      ></Bar>
    </BarChart>
  );
};

export default Charts;
