import React, { useEffect, useState } from "react";
import axios from "axios";
import { Subscriber } from "../types/feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBlog } from "@fortawesome/free-solid-svg-icons";

interface SubscriberSidebarProps {
  subscriberId: number
}

const SubscriberSidebar: React.FC<SubscriberSidebarProps> = ({subscriberId}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get("http://localhost:62202/api/subscribers");
        setSubscribers(response.data); // Adjust to your API structure if necessary
        setLoading(false);
      } catch (err) {
        setError("Error fetching blog list");
        setLoading(false);
      }
    };

    fetchSubscribers();
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
          <li>
            <a href="/" className={`is-size-7 ${subscriberId == -1 ? "is-active" : ""}`}>
            All
            </a>
          </li>
          {!loading &&
            !error &&
            subscribers.map((subscriber) => (
              <li>
                <a href={`/blog/${subscriber.id}`} className={`is-size-7 ${subscriber.id == subscriberId ? "is-active" : ""}`}>
                  {subscriber.name}
                </a>
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};

export default SubscriberSidebar;
