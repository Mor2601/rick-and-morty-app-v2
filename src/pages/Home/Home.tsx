import { useState, useEffect } from "react";
import { TextField, Grid, Dialog, Button, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { SelectChangeEvent } from "@mui/material/Select";
import Filters from "../../components/Filters/Filters";

import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { ApiEndpoints, Character } from "../../types";
import CharacterTable from "../../components/CharacterTable/CharacterTable";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import Model from "../../components/Modal/Modal";

interface HomeProps {
  apiEndpoints: ApiEndpoints | null;
  selectedView: string;
}
const Home: React.FC<HomeProps> = ({ apiEndpoints, selectedView }) => {
  const [search, setSearch] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [query, setQuery] = useState("");
  const [character, setCharacter] = useState<Character | undefined>();
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const { data } = useFetch<Character[]>(
    `${apiEndpoints?.characters ?? ""}${query}`
  );
  const debouncedSearch = useDebounce(search, 500);
  /**
   * build query for pagination when the filters dont updated
   */

  useEffect(() => {
    let queryBuild = `/?page=${page}&name=${debouncedSearch}&status=${selectStatus.toLowerCase()}&gender=${selectGender.toLowerCase()}`;
    setQuery(queryBuild);
  }, [page]);
  /**
   * build query for pagination when filters was updated
   * it reset the page to 1
   */
  useEffect(() => {
    let queryBuild = `/?${debouncedSearch ? `name=${debouncedSearch}&` : ""}${
      selectStatus ? `status=${selectStatus.toLowerCase()}&` : ""
    }${selectGender ? `gender=${selectGender.toLowerCase()}` : ""}`;

    setPage(1);
    setQuery(queryBuild);
  }, [selectGender, selectStatus, debouncedSearch]);

  const handleClearAll = () => {
    setSearch("");
    setSelectStatus("");
    setSelectGender("");
    setQuery("");
    setPage(1);
  };
  const handleGender = (event: SelectChangeEvent) => {
    setSelectGender(event.target.value);
    console.log(event.target.value);
  };
  const handleStatus = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value);
    console.log(event.target.value);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleClickOpen = (selectedCharacter: Character) => {
    setCharacter(selectedCharacter);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={13}
    >
      <Grid item xs={13}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearch}
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
      </Grid>
      <Grid item xs={6}>
        <Filters
          selectedOption={selectGender}
          selectionOptions={["Female", "Male", "Genderless", "unknown"]}
          onSelectionChange={handleGender}
          label={"Gender"}
          sx={{ marginTop: "10px" }}
          labelId="gender-select-label"
          id="gneder-select"
        ></Filters>
      </Grid>
      <Grid item xs={6}>
        <Filters
          selectedOption={selectStatus}
          selectionOptions={["Alive", "Dead", "unknown"]}
          onSelectionChange={handleStatus}
          label={"Status"}
          sx={{ marginTop: "10px" }}
          labelId="status-select-label"
          id="status-select"
        ></Filters>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          name="Clear All"
          onClick={handleClearAll}
          variant="contained"
          color="primary"
          size="large"
        >
          Clear All
        </Button>
      </Grid>
      <Grid item xs={13}>
        {selectedView == "Table" ? (
          <CharacterTable
            characters={data?.results}
            onClick={handleClickOpen}
          />
        ) : selectedView == "Card" ? (
          <CharacterCard characters={data?.results} onClick={handleClickOpen} />
        ) : null}
      </Grid>
      <Grid item xs={13}>
        <Pagination
          count={data?.info?.pages}
          page={page}
          onChange={handlePageChange}
          defaultPage={1}
        />
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Model
          sx={{ width: "400px", height: "400px" }}
          character={character}
          episodeApi={apiEndpoints?.episodes}
          height="280"
        />
      </Dialog>
    </Grid>
  );
};

export default Home;
