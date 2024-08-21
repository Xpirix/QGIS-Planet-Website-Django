import React, { useState } from 'react';
import "./App.sass";
import Header from "./components/Header";
import PaginatedPostList from "./components/PaginatedPostList";
import Footer from "./components/Footer";
import "./assets/styles/style.scss";
import FeedSidebar from "./components/FeedSidebar";

import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // const handleTagSelect = (newTag: string) => {
  //   if (!selectedTags.includes(newTag)) {
  //     setSelectedTags((prevTags) => [...prevTags, newTag]);
  //   }
  // };
  return (
    <div className="App">
      <Header />
      {/* Other components and content */}
      <section className="section">
      <div className="columns">
        <div className="column">
          <FeedSidebar />
        </div>
        <div className="column is-four-fifths">
          
          <Routes>
            <Route path="/" element={<PaginatedPostList />}></Route>
            
          </Routes>
          
        </div>
      </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;
