import Link from "next/link";
import React from "react";
const NavItem = ({ text, href, active }) => {
  return (
    // <Link href={href}>
    //   <a className={`nav__link`}>{text}</a>
    // </Link>
    <Link href={href} className={`nav__link`}>
      {text}
    </Link>
  );
};

export default NavItem;