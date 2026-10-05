import React, { useState } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";

export const navbarLinks = [
  { id: 1, title: "HOME", link: "heroSection" },
  { id: 2, title: "ABOUT US", link: "about" },
  { id: 3, title: "SERVICES", link: "qualities" },
  { id: 4, title: "TEAM", link: "team" },
  { id: 5, title: "RESERVATION", link: "reservation" }
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav>
        <div className="logo">GIRISH</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          <Link to="menu" spy={true} smooth={true} duration={500}>
            <button className="menuBtn">OUR MENU</button>
          </Link>
        </div>
        <div className="hamburger" onClick={()=> setShow(!show)}>
                <GiHamburgerMenu/>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
