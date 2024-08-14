import React from 'react';

const Header: React.FC = () => {
  return (
    <section style={{height: 60 + 'px'}}>
        <qg-top-nav
        breakpoint="1024"
        class="is-highest navbar is-fixed-top"
        location-prefix="https://qgis.org"
    ></qg-top-nav>
    </section>
  );
};

export default Header;