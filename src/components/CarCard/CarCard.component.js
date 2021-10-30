import React from "react";
import carImage from "../../assets/images/car.jpg";
import "./CarCard.styles.scss";

export const CarCard = ({ make, year, model }) => {
  return (
    <div className='card'>
      <div className='card__header-container'>
        <h3 className='card__make'>{`${year} ${model}`}</h3>
        <p className='card__model'>{make}</p>
      </div>
      <div
        className='card__image-container'
        style={{ backgroundImage: `url(${carImage})` }}
      />
      <div className='card__details-container'>
        <p className='card__location'>Toronto, ON</p>
        <p className='card__price'>$99/day</p>
      </div>
      <div className='card__cta'>BOOK NOW</div>
    </div>
  );
};
