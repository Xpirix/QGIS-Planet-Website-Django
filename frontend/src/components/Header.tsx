import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
interface HeaderProps {
  isAuthenticated: boolean;
  username?: string;
}

const Header: React.FC = () => {

  return (
    <section style={{height: 60 + 'px'}}>
        <qg-top-nav
        breakpoint="1024"
        class="is-highest navbar is-fixed-top"
        location-prefix="https://qgis.org"
    ></qg-top-nav>
    
    <div className="box mb-0 context-container" id="context">
            <div className="container is-flex is-justify-content-flex-start">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a
                            role="button"
                            className="navbar-burger"
                            aria-label="menu"
                            data-target="menu"
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    
                    <div
                        id="menu"
                        className={`navbar-menu is-active`}
                    >
                        <div className="navbar-end">
                            <div className="navbar-item has-text-weight-semibold is-size-10">
                                <span>QGIS Planet</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </section>
  );
};

export default Header;