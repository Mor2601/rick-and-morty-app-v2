import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from "@mui/material";
import { Character } from "../../types";

interface CharactersTableProps {
  characters: Character[] | undefined;
  onClick: (character: Character) => void;
}

const CharactersTable: React.FC<CharactersTableProps> = ({
  characters,
  onClick,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: "auto",
        maxHeight: {
          xs: "50vh", // max height for extra-small screens
          sm: "60vh", // max height for small screens
          md: "70vh", // max height for medium screens
          lg: "80vh", // max height for large screens
          xl: "90vh"  // max height for extra-large screens
        },
        height: "100%",
        width: "100%",
        boxSizing: "border-box"
      }}
      elevation={12}
    >
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Origin</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Species</TableCell>
            <TableCell align="left">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters?.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={(
                _event: React.MouseEvent<HTMLTableRowElement> | undefined
              ) => {
                onClick(row);
              }}
            >
              <TableCell component="th" scope="row">
                <Avatar alt={row.name} src={row.image} />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.origin.name}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.species}</TableCell>
              <TableCell align="left">{row.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CharactersTable;
