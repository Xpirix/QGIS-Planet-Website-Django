import React from 'react';
import './App.sass';
import Header from './components/Header';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      {/* Other components and content */}
    </div>
  );
};

export default App;
