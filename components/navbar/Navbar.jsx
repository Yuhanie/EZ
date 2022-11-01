import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import NavItem from "./NavItem";
import ezlogo from '../../public/pic/ezlogo.png';
import { Button, TextField } from '@mui/material';
const MENU_LIST = [
  { text: "登入", href: "/login" },
  { text: "註冊", href: "/register"},
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          {/* <a> */}
          <div className={`nav_logo`}>
            <Image src={ezlogo}/>
          </div>
          {/* </a> */}
          
        </Link>

        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>                                                       
      

      <div className={`nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
            <Button variant="contained" color="primary"><span className={`${navActive ? "active" : ""} `}>
              <NavItem active={activeIdx === idx} {...menu} />
              </span>
            </Button>
            </div>
            
          ))}
      </div>
        

      </nav>
    </header>
  );
};

export default Navbar;