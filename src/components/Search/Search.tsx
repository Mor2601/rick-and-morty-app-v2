import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
const Search: React.FC = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="Search" variant="outlined" 
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      />

    </div>
  );
};
export default Search;
