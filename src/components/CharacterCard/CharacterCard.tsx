 import React from 'react'
 import { Grid, Card, CardContent, CardMedia, Typography, Divider, CardActionArea, Paper } from '@mui/material';
import { Character } from '../../types';

 interface CharacterCardProps {

    characters: Character[]|undefined;
    onClick: (character: Character) => void;
}
 const CharacterCard:React.FC<CharacterCardProps> = ({characters,onClick}) => {
   return (
    <Grid container spacing={1}>
        {characters?.map((character,index) => (
             <Grid item lg={12/5}  key={index} >
                <CardActionArea onClick={(_event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                        onClick(character);
                 }}>
          <Card style={{ width: "100vh", height: "170px" }} >
            <Grid container  direction="row" justifyContent="flex-start">
            <Grid item xs={1}>
            <CardMedia
              component="img"
              
              image={character.image}
              alt="Character"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
            </Grid>
            <Grid item xs={11}>
              <Typography align="left" gutterBottom variant="h6" component="div">
                {character.name}
              </Typography>
            </Grid>
            </Grid>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Status {character.status}
              </Typography>
              <Divider variant="inset" />
              <Typography variant="body1" color="text.secondary">
                Species  {character.species}
              </Typography>
              <Divider />
            </CardContent>
          </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>

   )
 }
 
export default CharacterCard