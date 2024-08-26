import React, { useState } from 'react';
import "./App.sass";
import Header from "./components/Header";
import PaginatedPostList from "./components/PaginatedPostList";
import PostBySubscriber from "./components/PostBySubscriber";
import Footer from "./components/Footer";
import "./assets/styles/style.scss";
import SubscriberSidebar from "./components/SubscriberSidebar";
import SustainingMembers from "./components/SustainingMembers";

import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const [subscriberId, setSubscriberId] = useState<number>(-1);

  // Function to handle value received from child component
  const handleSubscriberId = (value: number) => {
    setSubscriberId(value);
  };
  return (
    <div className="App">
      <Header />
      {/* Other components and content */}
      <section className="section">
      <div className="columns">
        <div className="column">
          <SubscriberSidebar subscriberId={subscriberId} />
        </div>
        <div className="column is-four-fifths">
          
          <Routes>
            <Route path="/" element={<PaginatedPostList />}></Route>
            <Route path="/blog/:subscriberId/" element={<PostBySubscriber handleSubscriberId={handleSubscriberId}/>}></Route>
          </Routes>
          
        </div>
      </div>
      </section>
      <SustainingMembers />
      <Footer />
    </div>
  );
};

export default App;
