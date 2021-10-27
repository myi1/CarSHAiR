import React from "react";

import { CarCard } from "../CarCard/CarCard.component";

import "./Results.styles.scss";

export const Results = ({ cars, query, count }) => {
  console.log(cars);
  return (
    <div className='results'>
      <p className='results__query'>
        Search results for: {cars && cars.length > 0 ? query : null}
      </p>
      <p className='results__count'>
        {cars && cars.length > 0 ? count : null} results
      </p>
      {cars && cars.length > 0
        ? cars.map((car, i) => (
            <CarCard
              key={i}
              make={car.Make_Name}
              model={car.Make_Name}
              year='2020'
            />
          ))
        : null}
    </div>
  );
};
