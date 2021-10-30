import React from "react";

import logo from "../../assets/images/logo.png";

import "./DesktopNav.styles.scss";

export const DesktopNav = () => {
  return (
    <div className='desktop-nav'>
      <div className='desktop-nav__left'>
        <a
          href='https://www.carshair.com/rent-a-car'
          className='desktop-nav__item'>
          RENT A CAR
        </a>
        <a
          href='https://www.carshair.com/list-your-car'
          className='desktop-nav__item'>
          LIST A CAR
        </a>
      </div>
      <div className='desktop-nav__middle'>
        <img className='desktop-nav__logo' src={logo} alt='logo' />
      </div>
      <div className='desktop-nav__right'>
        <a
          href='https://www.carshair.com/register'
          className='desktop-nav__item'>
          REGISTER
        </a>
        <a href='https://www.carshair.com/login' className='desktop-nav__item'>
          LOGIN
        </a>
      </div>
    </div>
  );
};
