import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface FiltersProps {
  selectionOptions: string[];
  selectedOption: string;
  onSelectionChange: (event: SelectChangeEvent) => void;
  sx?: React.CSSProperties;
  label: string;
  labelId: string;
  id: string;
}

const Filters: React.FC<FiltersProps> = ({
  selectedOption,
  selectionOptions,
  onSelectionChange,
  sx,
  label,
  labelId,
  id,
}) => {

  return (
    <Box sx={sx}>
      <FormControl fullWidth >
        <InputLabel id={labelId} sx={{color:label=="View"? "white":"rgb(118, 118, 118)"}}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={selectedOption}
          label={label}
          onChange={onSelectionChange}
          sx={{color:label=="View"? "white":"black"}}
        >
          {selectionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Filters;
