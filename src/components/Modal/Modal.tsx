import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Divider } from "@mui/material";
import { Character } from "../../types";
import useFetch from "../../hooks/useFetch";
import { Episode } from "../../types";
import useFetchMultiple from "../../hooks/useFetchMulitpleData";
interface ModelProps {
  sx?: React.CSSProperties;
  character: Character | undefined;
  episodeApi: string | undefined;
  height: string;
}
const Modal: React.FC<ModelProps> = ({ sx, character, episodeApi,height }) => {
  const [firstEpisode, setFirstEpisode] = useState<string | undefined>("");
  const [lastEpisode, setLastEpisode] = useState<string | undefined>("");
  const [query, setQuery] = useState<string>("");
  const [characterTest, setCharacterTest] = useState<Character | undefined>(
    character
  );
  const { data, error, loading } = useFetchMultiple<Episode[]>(
    `${episodeApi ?? ""}${query}`
  );

  const extractEpisode = (episodeUrl: string) => {
    
    const episodeId = episodeUrl.split("/").pop() ?? "";

    return parseInt(episodeId);
  };
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

export default Modal;
