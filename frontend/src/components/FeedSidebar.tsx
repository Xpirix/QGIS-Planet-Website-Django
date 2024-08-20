import React, { useEffect, useState } from "react";
import axios from "axios";
import { Feed } from "../types/feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBlog } from "@fortawesome/free-solid-svg-icons";

const FeedSidebar: React.FC = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get("http://localhost:62202/api/feeds");
        setFeeds(response.data); // Adjust to your API structure if necessary
        setLoading(false);
      } catch (err) {
        setError("Error fetching feeds");
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);
  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="button is-fullwidth is-hidden-desktop is-hidden-tablet"
        onClick={toggleSidebar}
        style={{ marginBottom: "1rem" }}
      >
        <span className="icon">
          <FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBlog} />
        </span>
        <span>Blog list</span>
      </button>
      <aside
        className={`menu box ${
          isSidebarVisible ? "is-active" : "is-hidden-mobile"
        }`}
      >
        <p className="menu-label">Blog list</p>
        <ul className="menu-list">
          {loading && <li>Loading...</li>}
          {error && <li>{error}</li>}
          {!loading &&
            !error &&
            feeds.map((feed) => (
              <li key={feed.id}>
                <a href="#" className="is-size-7">
                  {feed.name}
                </a>
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};

export default FeedSidebar;
