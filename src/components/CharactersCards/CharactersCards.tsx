import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Divider, CardActionArea, useMediaQuery, useTheme } from '@mui/material';
import { Character } from '../../types';

interface CharactersCardsProps {
  characters: Character[] | undefined;
  onClick: (character: Character) => void;
}

const CharactersCards: React.FC<CharactersCardsProps> = ({ characters, onClick }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  /**
   * 
   * @returns adjust the grid item size based on the screen size
   */
  const getGridItemSize = () => {
    if (isXs) return 12;
    if (isSm) return 6;
    if (isMd) return 4;
    if (isLg) return 3;
    return 12 / 5;
  };

  return (
    <Grid container spacing={2}>
      {characters?.map((character, index) => (
        <Grid item xs={getGridItemSize()} key={index}>
          <CardActionArea
            onClick={(_event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
              onClick(character);
            }}
          >
            <Card style={{ width: '100%', height: '170px' }}>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    image={character.image}
                    alt="Character"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography align="left" gutterBottom variant="h6" component="div">
                    {character.name}
                  </Typography>
                </Grid>
              </Grid>
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Status: {character.status}
                </Typography>
                <Divider variant="inset" />
                <Typography variant="body1" color="text.secondary">
                  Species: {character.species}
                </Typography>
                <Divider />
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
};

export default CharactersCards;
