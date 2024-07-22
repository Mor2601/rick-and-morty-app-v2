import { useState, useEffect } from "react";
import {
  Grid,
  Dialog,
  Button,
  Pagination,
  Box,
  
} from "@mui/material";
import NoResult from "../../components/NoResult/NoResult";
import { SelectChangeEvent } from "@mui/material/Select";
import Filters from "../../components/Filters/Filters";
import CharactersCards from "../../components/CharactersCards/CharactersCards";
import { ApiEndpoints, Character } from "../../types";
import CharactersTable from "../../components/CharactersTable/CharactersTable";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";
import Model from "../../components/Model/Model";
import Search from "../../components/Search/Search";

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

  useEffect(() => {
    let queryBuild = `/?page=${page}&name=${debouncedSearch}&status=${selectStatus.toLowerCase()}&gender=${selectGender.toLowerCase()}`;
    setQuery(queryBuild);
  }, [page]);

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
  };

  const handleStatus = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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

  const characters = data?.results ?? [];
  const hasResults = characters.length > 0;

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", padding: "16px" }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={13}
      >
        <Grid item xs={13}>
          <Search search={search} handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={6}>
          <Filters
            selectedOption={selectGender}
            selectionOptions={["Female", "Male", "Genderless", "unknown"]}
            onSelectionChange={handleGender}
            label={"Gender"}
            sx={{ marginTop: "10px" }}
            labelId="gender-select-label"
            id="gender-select"
          />
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
          />
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
            size="small"
          >
            Clear All
          </Button>
        </Grid>
        <Grid
          item
          xs={13}
          sx={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}
        >
          {!hasResults ? (
            <NoResult     />
          ) : selectedView === "Table" ? (
            <CharactersTable characters={characters} onClick={handleClickOpen} />
          ) : selectedView === "Cards" ? (
            <CharactersCards characters={characters} onClick={handleClickOpen} />
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
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Model
          sx={{ width: "400px", height: "400px" }}
          character={character}
          episodeApi={apiEndpoints?.episodes}
          height="280"
        />
      </Dialog>
    </Box>
  );
};

export default Home;

    

  