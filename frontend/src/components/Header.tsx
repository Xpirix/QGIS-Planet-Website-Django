import React, { useState } from 'react';
import ThemeSwitcher from "./ThemeSwitcher";
import '../assets/styles/components/Header.scss'


const Header: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  return (
    <section style={{ height: 112 + "px" }}>
      <qg-top-nav
        breakpoint="1024"
        class="is-highest navbar is-fixed-top"
        location-prefix="https://qgis.org"
      ></qg-top-nav>

      <div className="box mb-0 context-container" id="context">
        <div className="container is-flex is-justify-content-flex-start">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
            style={{width: 100 + '%'}}
          >
            <div className="navbar-brand">
              <a
                role="button"
                className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                aria-label="menu"
                aria-expanded="false"
                data-target="menu"
                onClick={handleBurgerClick}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
                <div className="navbar-item has-text-weight-semibold is-size-10 has-text-white">
                  <span>QGIS Planet</span>
                </div>
            </div>

            <div id="menu" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
              <div className="navbar-end">
                <ThemeSwitcher />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
