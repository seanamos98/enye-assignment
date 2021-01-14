import React from "react";
import SearchIcon from "@material-ui/icons/Search";

import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <a href="/">
            <span className="header__logoSpan">E</span>
            <span>Enye</span>
          </a>
        </div>
        <div className="header__search">
          <input
            type="search"
            className="header__searchInput"
            placeholder="Search"
          />
          <SearchIcon className="header__searchIcon" />
        </div>

        <nav className="header__nav">
          <ul>
            <li>
              <a href="https://www.enye.tech" rel="noreferrer" target="_blank">
                Site
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
