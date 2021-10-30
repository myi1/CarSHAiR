import React from "react";
import car1 from "../../assets/images/cars/car1.jpg";
import car2 from "../../assets/images/cars/car2.jpg";
import car3 from "../../assets/images/cars/car3.jpg";
import car4 from "../../assets/images/cars/car4.jpg";
import car5 from "../../assets/images/cars/car5.jpg";
import car6 from "../../assets/images/cars/car6.jpg";
import car7 from "../../assets/images/cars/car7.jpg";
import car8 from "../../assets/images/cars/car8.jpg";
import car9 from "../../assets/images/cars/car9.jpg";
import car10 from "../../assets/images/cars/car10.jpg";
import car11 from "../../assets/images/cars/car11.jpg";
import car12 from "../../assets/images/cars/car12.jpg";
import car13 from "../../assets/images/cars/car13.jpg";
import car14 from "../../assets/images/cars/car14.jpg";
import car15 from "../../assets/images/cars/car15.jpg";
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
        style={{ backgroundImage: `url(${carsArray[randomInteger(0, 14)]})` }}
      />
      <div className='card__details-container'>
        <p className='card__location'>Toronto, ON</p>
        <p className='card__price'>$99/day</p>
      </div>
      <div className='card__cta'>BOOK NOW</div>
    </div>
  );
};

const carsArray = [
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
  car9,
  car10,
  car11,
  car12,
  car13,
  car14,
  car15,
];

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
