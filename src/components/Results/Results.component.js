import React from "react";

import { CarCard } from "../CarCard/CarCard.component";

import "./Results.styles.scss";

export const Results = ({ cars, query, count, year, make, type }) => {
  return (
    <div className='results'>
      <div className='results__text-container'>
        {query ? (
          <p className='results__query'>Search results for: {query}</p>
        ) : null}
        {count ? <p className='results__count'>{count} results</p> : null}
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
        {query && cars.length == 0 ? (
          <div className='results__no-match'>
            <h4 className='results__header'>Hmmm...</h4>
            <p className='results__sub-header'>
              Sorry! We couldn't find any matches for "{query}".
            </p>
            {year || make || type ? (
              <div className='results__filter-container'>
                <p className='results__sub-header'>Using these filters:</p>
                {year ? <p className='results__filter'>Year: {year}</p> : null}
                {make ? <p className='results__filter'>Make: {make}</p> : null}
                {type ? <p className='results__filter'>Type: {type}</p> : null}
              </div>
            ) : null}
            <p className='results__body'>
              Double check your search for any typos or spelling errors - or try
              a different search term.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
