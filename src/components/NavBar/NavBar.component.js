import React from "react";
import { DesktopNav } from "../DesktopNav/DesktopNav.component";

import { MobileNav } from "../MobileNav/MobileNav.component";

import "./NavBar.styles.scss";

export const NavBar = () => {
  return (
    <div className='nav'>
      <MobileNav />
      <DesktopNav />
    </div>
  );
};
