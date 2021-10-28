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
  const prevQuery = usePrevious(query);
  const [count, setCount] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [type, setType] = useState("");

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

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
      })
      .then((_response) => {
        if (query !== prevQuery) {
          getTypesByMake();
        }
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
    filterHandler(e);
  };
  const setMakeHandler = (e) => {
    setMake(e.target.value);
    filterHandler(e);
  };
  const setTypeHandler = (e) => {
    setType(e.target.value);
    filterHandler(e);
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
    }
  };

  const filterByYear = (e) => {
    console.log(typeof e.target.value);
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
  return (
    <div className='App'>
      <NavBar />
      <Search
        handleSearch={debouncedSearchHandler}
        filterByYear={setYearHandler}
        filterByMake={setMakeHandler}
        filterByType={setTypeHandler}
        // filterHandler={filterHandler}
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
