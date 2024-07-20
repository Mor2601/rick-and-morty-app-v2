import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Character, Location, Episode } from "../../types";
import Avatar from "@mui/material/Avatar";
interface CharacterTableProps {
  characters: Character[] | undefined;
}
const CharacterTable: React.FC<CharacterTableProps> = ({ characters }) => {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer
      component={Paper}

    >
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover
              onClick={() => console.log("row clicked")}
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
