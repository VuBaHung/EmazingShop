import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
const NavBar = ({ activeHeading }) => {
  return (
    <div className={`${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={i.title}>
            <Link
              to={i.url}
              className={`${
                activeHeading === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavBar;
