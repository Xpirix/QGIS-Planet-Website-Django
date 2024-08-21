import React from "react";
import "./App.sass";
import Header from "./components/Header";
import PaginatedPostList from "./components/PaginatedPostList";
import Footer from "./components/Footer";
import "./assets/styles/style.scss";
import FeedSidebar from "./components/FeedSidebar";
import TagSearchBar from "./components/TagSearch";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
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
          <TagSearchBar />
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
