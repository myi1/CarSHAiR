import React, { useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { CarCard } from "./components/CarCard/CarCard.component";

import { NavBar } from "./components/NavBar/NavBar.component";
import { Search } from "./components/Search/Search.component";
import { Results } from "./components/Results/Results.component";

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState("");
  const getModelsByMakeSearch = (e) => {
    const query = e.target.value;
    e.preventDefault();
    console.log(e.target.value);
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${query}?format=json`
      )
      .then((response) => {
        setQuery(e.target.value);
        setResults(response.data.Results);
        setCount(response.data.Count);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(getModelsByMakeSearch, 300),
    [results, query, count]
  );
  return (
    <div className='App'>
      <NavBar />
      <Search handleSearch={debouncedSearchHandler} />
      <Results cars={results} query={query} count={count} />
      {/* <CarCard make='Toyota' year='2020' model='Corolla' /> */}
    </div>
  );
}

export default App;
