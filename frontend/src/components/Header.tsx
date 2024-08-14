import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">My Website</h1>
          <h2 className="subtitle">Welcome to my website built with React and Bulma</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;