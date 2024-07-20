import { useState, useEffect } from "react";
import { Container, TextField, Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { SelectChangeEvent } from "@mui/material/Select";
import Filters from "../../components/Filters/Filters";
import MyButton from "../../components/Button/MyButton";
import { fetchData } from "../../services/api";
import MyPagination from "../../components/Pagination/MyPagination";
import {
  ApiEndpoints,
  Episode,
  Location,
  PaginationInfo,
  Character,
} from "../../types";
import CharacterTable from "../../components/CharacterTable/CharacterTable";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

interface HomeProps {
  apiEndpoints: ApiEndpoints | null;
}
const Home: React.FC<HomeProps> = ({ apiEndpoints }) => {
  const [search, setSearch] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);

  const { data, error, loading } = useFetch<Character[]>(
    apiEndpoints?.characters ?? "",
    `${query}`
  );
  const debouncedSearch = useDebounce(search, 500);
  const debouncedStatus = useDebounce(selectStatus, 500);
  const debouncedGender = useDebounce(selectGender, 500);
  useEffect(() => {
    let queryBuild = `?`;
    queryBuild += `page=${page}&`;
    queryBuild += `name=${debouncedSearch}&`;
    queryBuild += `status=${selectStatus.toLowerCase()}&`;
    queryBuild += `gender=${selectGender.toLowerCase()}`;
    setQuery(queryBuild);
  }, [page]);
  /**
   * build the query based on the states
   */
  useEffect(() => {
    let queryBuild = `?`;

    queryBuild += `page=1&`;
    setPage(1);

    if (debouncedSearch) {
      queryBuild += `name=${debouncedSearch}&`;
    }
    if (selectStatus) {
      queryBuild += `status=${selectStatus.toLowerCase()}&`;
    }
    if (selectGender) {
      queryBuild += `gender=${selectGender.toLowerCase()}`;
    }

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
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
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
        <MyButton
          name="Clear All"
          onClick={handleClearAll}
          variant="contained"
          color="primary"
          size="large"
        />
      </Grid>
      <Grid item xs={13}>
        <CharacterTable characters={data?.results} />
      </Grid>
      <Grid item xs={13}>
        <MyPagination
          pageAmount={data?.info?.pages}
          currentPage={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
