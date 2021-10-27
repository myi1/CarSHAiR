import React from "react";
import { CarCard } from "./components/CarCard/CarCard.component";

import { NavBar } from "./components/NavBar/NavBar.component";
import { Search } from "./components/Search/Search.component";

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Search />
      <CarCard make='Toyota' year='2020' model='Corolla' />
    </div>
  );
}

export default App;
