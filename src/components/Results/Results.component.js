import React from "react";

import { CarCard } from "../CarCard/CarCard.component";

import "./Results.styles.scss";

export const Results = ({ cars, query, count, year }) => {
  return (
    <div className='results'>
      <div className='results__text-container'>
        <p className='results__query'>
          Search results for: {cars && cars.length > 0 ? query : null}
        </p>
        <p className='results__count'>
          {cars && cars.length > 0 ? count : null} results
        </p>
      </div>
      <div className='results__container'>
        {cars && cars.length > 0
          ? cars.map((car, i) => (
              <CarCard
                key={i}
                make={car.Make_Name}
                model={car.Model_Name}
                year={year ? year : "1995-2021"}
              />
            ))
          : null}
      </div>
    </div>
  );
};
