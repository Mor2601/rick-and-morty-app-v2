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
import useFetch from "../../hooks/useFetch";

const chartSetting = {
  width: 900,
  height: 800,
  colors: ["#538ccb"],
};

const episodesData = [
  { episode: "S01E01", charactersNumberInEpisode: 20 },
  { episode: "S01E02", charactersNumberInEpisode: 18 },
  // Add more episodes as needed
];
interface ChartsProp {
  episodeApi: string | undefined;
}
const Charts: React.FC<ChartsProp> = ({ episodeApi }) => {
  const [requestUrl, setRequestUrl] = useState<string | undefined>(episodeApi);
  const { data, error, loading } = useFetch<Episode[]>(requestUrl || "");
  const [episodeData2, setEpisodeData] = useState<
    Array<{ episode: string; charactersNumberInEpisode: number }>
  >([]);
  useEffect(() => {
    if (data?.results) {
      const episodes = data.results.map((episode) => ({
        episode: episode.episode,
        charactersNumberInEpisode: episode.characters.length,
      }));

      setEpisodeData((prevState) => [...prevState, ...episodes]);
    }

    if (data?.info?.next) {
      setRequestUrl(data.info.next);
    }
  }, [data]);

  useEffect(() => {
    setRequestUrl(episodeApi);
    setEpisodeData([]);
  }, [episodeApi]);

  return (
    <BarChart
      width={chartSetting.width}
      height={chartSetting.height}
      data={episodeData2}
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
