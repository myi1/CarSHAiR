import React, { useState, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import { NavBar } from "./components/NavBar/NavBar.component";
import { Search } from "./components/Search/Search.component";
import { Results } from "./components/Results/Results.component";

function App() {
  const [results, setResults] = useState([]);
  const [allMakes, setAllMakes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [type, setType] = useState("");

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const getModelsByMakeSearch = (e) => {
    const query = e.target.value;
    e.preventDefault();
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${query}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setQuery(e.target.value);
        setCount(response.data.Count);
        setAllMakes(getUniqueListBy(response.data.Results, "Make_ID"));
        setYear("");
        setMake("");
        setType("");
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(getModelsByMakeSearch, 300),
    [results]
  );

  const setYearHandler = (e) => {
    setYear(e.target.value);
    filterHandler(e.target.value);
  };
  const setMakeHandler = (e) => {
    setMake(e.target.value);
    filterHandler(e.target.value);
  };
  const setTypeHandler = (e) => {
    setType(e.target.value);
    filterHandler(e.target.value);
  };

  const filterHandler = (e) => {
    if (
      (query && year && !make && !type) ||
      (!query && year && make && !type)
    ) {
      filterByYear(e);
    } else if (year && !make && type) {
      filterByYearAndType(e);
    } else if (year && make && type) {
      filterByYearAndTypeAndMake(e);
    } else if (query && !year && !make && type) {
      filterByType(e);
    } else if (!year && make && !type) {
      filterByMake(e);
    }
  };

  const filterByYear = (year) => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${query}/modelyear/${year}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setCount(response.data.Count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterByMake = (m) => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${m}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setCount(response.data.Count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterByType = (e) => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${query}/vehicletype/${type}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setCount(response.data.Count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTypesByMake = () => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${query}?format=json`
      )
      .then((response) => {
        const results = getUniqueListBy(response.data.Results, "VehicleTypeId");
        const fixedResults = results.map((result) => ({
          ...result,
          VehicleTypeName: result.VehicleTypeName.trim(),
        }));
        setAllTypes(fixedResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterByYearAndType = () => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${query}/modelyear/${year}/vehicletype/${type}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setCount(response.data.Count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterByYearAndTypeAndMake = () => {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}?format=json`
      )
      .then((response) => {
        setResults(response.data.Results);
        setCount(response.data.Count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getTypesByMake, [query]);

  return (
    <div className='App'>
      <NavBar />
      <Search
        handleSearch={debouncedSearchHandler}
        filterByYear={setYearHandler}
        filterByMake={setMakeHandler}
        filterByType={setTypeHandler}
        year={year}
        make={make}
        type={type}
        allMakes={allMakes}
        allTypes={allTypes}
      />
      <Results cars={results} query={query} count={count} year={year} />
    </div>
  );
}

export default App;
