import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/components/TagSearch.scss";

interface Tag {
  name: string;
}

interface TagSearchBarProps {
  onTagSelect: (selectedTag: string) => void; // Prop for sending the selected tag to parent
}

const TagSearchBar: React.FC<TagSearchBarProps> = ({ onTagSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:62202/api/tags?q=${searchQuery}`
          );
          setTags(response.data || []);
          setLoading(false);
          setShowSuggestions(true);
        } catch (err) {
          setError("Error fetching tags");
          setLoading(false);
          setShowSuggestions(false);
        }
      } else {
        setTags([]);
        setShowSuggestions(false);
      }
    };

    fetchTags();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectTag = (tagName: string) => {
    setSearchQuery(tagName);
    setShowSuggestions(false); // Hide suggestions after selecting a tag
    onTagSelect(tagName); // Notify parent of the selected tag
  };

  return (
    <div className="autocomplete ml-3 mr-3">
      <input
        className="input"
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        style={{ marginBottom: "1rem" }}
      />

      {showSuggestions && tags.length > 0 && (
        <div className="autocomplete-dropdown box p-0">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <ul>
            {tags.map((tag, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSelectTag(tag.name)}
                style={{ cursor: "pointer" }}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSuggestions && searchQuery && tags.length === 0 && !loading && (
        <div className="autocomplete-dropdown box">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default TagSearchBar;
