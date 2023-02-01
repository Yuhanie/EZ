import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import NavItem from "./NavItem";
import ezlogo from '../../public/pic/ezlogo.png';
import { Button, TextField, Box, BoxProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ClassNames } from "@emotion/react";







const MENU_LIST = [
  { text: "登入", href: "/login" },
  //{ text: "註冊", href: "/register"},
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);



  return (

    <nav className={`nav`}>
      <Box
        component="span"
        sx={{
          display: 'inflex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <div>
          <Link href={"/"}>
            <div className={`nav_logo`}>
              <Image src={ezlogo} />
            </div>
          </Link>
        </div>
      </Box>
      <Box>
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

            <MenuIcon />
          </div>
      </Box>


    </nav>
  );
};

export default Navbar;