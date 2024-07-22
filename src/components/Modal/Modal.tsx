import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider
} from "@mui/material";;
import { Character } from "../../types";
import { Episode } from "../../types";
import useFetchMultiple from "../../hooks/useFetchMulitpleData";
interface ModelProps {
  sx?: React.CSSProperties;
  character: Character | undefined;
  episodeApi: string | undefined;
  height: string;
}
const Model: React.FC<ModelProps> = ({ sx, character, episodeApi,height }) => {
  const [firstEpisode, setFirstEpisode] = useState<string | undefined>("");
  const [lastEpisode, setLastEpisode] = useState<string | undefined>("");
  const [query, setQuery] = useState<string>("");

  const { data} = useFetchMultiple<Episode[]>(
    `${episodeApi ?? ""}${query}`
  );
  /**
   * exract the episode id from the url for the query for 
   * fetching the first and last episode
   * @param episodeUrl 
   * @returns 
   */
 
  const extractEpisode = (episodeUrl: string) => {
    
    
    try {
      const episodeId = episodeUrl.split("/").pop() ?? "";
      if (episodeId) {
        return parseInt(episodeId);
      }else{
        return undefined;
      }
    } catch (error) {
      console.error("error in extractEpisode", error);
    }


  };
  /**
   * fetch the first and last episode of the character
   */
  useEffect(() => {
    if (character) {
      const firstEpisodeId = character.episode[0]
        ? extractEpisode(character.episode[0])
        : undefined;
      const lastEpisodeId =
        character.episode.length > 1
          ? extractEpisode(character.episode[character.episode.length - 1])
          : undefined;

      if (firstEpisodeId && lastEpisodeId) {
        setQuery(`/[${firstEpisodeId},${lastEpisodeId}]`);
      } else if (firstEpisodeId) {
        setQuery(`/[${firstEpisodeId}]`);
      }
    }
  }, [character]);
  /**
   * set the first and last episode of the character
   * if the charater appears only in one episode 
   * the first episode will be the last episode.
   */
  useEffect(() => {
    if (data) {
      if (data?.length === 2) {
        setFirstEpisode(data[0]?.episode);
        setLastEpisode(data[1]?.episode);
      } else {
        setFirstEpisode(data[0]?.episode);
        setLastEpisode(data[0]?.episode);
      }
    } else {
      setFirstEpisode("");
      setLastEpisode("");
    }
  }, [data]);

  return (
    <Card sx={sx}>
      <CardMedia
        component="img"
        height={height}
        image={character?.image}
        alt={character?.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ paddingTop: "5px" }}
        >
          {character?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          First Appearance: {firstEpisode}
        </Typography>
        <Divider variant="inset" />
        <Typography variant="body2" color="text.secondary">
          Last Appearance: {lastEpisode}
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
};

export default Model;
