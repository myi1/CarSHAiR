import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import logo from "../../assets/images/logo.png";

import "./MobileNav.styles.scss";

export const MobileNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='mobile-nav'>
      <img className='mobile-nav__logo' src={logo} alt='logo' />
      <span
        className='material-icons mobile-nav__menu'
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        menu{" "}
      </span>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleClose}>Rent A Car</MenuItem>
        <MenuItem onClick={handleClose}>List A Car</MenuItem>
        <MenuItem onClick={handleClose}>Register</MenuItem>
        <MenuItem onClick={handleClose}>Login</MenuItem>
      </Menu>
    </div>
  );
};
