import React from 'react';
import './App.sass';
import Header from './components/Header';
import PaginatedPostList from './components/PaginatedPostList';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* Other components and content */}
      <PaginatedPostList />
    </div>
  );
};

export default App;
