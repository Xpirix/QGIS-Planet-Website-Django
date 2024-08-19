import React from 'react';
import './App.sass';
import Header from './components/Header';
import PaginatedPostList from './components/PaginatedPostList';
import Footer from './components/Footer';
import './assets/styles/style.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* Other components and content */}
      <PaginatedPostList />
      <Footer />
    </div>
  );
};

export default App;
