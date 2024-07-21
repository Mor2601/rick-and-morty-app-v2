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
interface CharacterTableProps {
  characters: Character[] | undefined;
  onClick: (character: Character) => void;
}
const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  onClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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

export default CharacterTable;
