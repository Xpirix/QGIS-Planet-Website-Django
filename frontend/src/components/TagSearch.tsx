import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/components/TagSearch.scss'

interface Tag {
  name: string;
}

const TagSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:62202/api/tags?q=${searchQuery}`);
          setTags(response.data || []);
          setLoading(false);
          setShowSuggestions(true);  // Show suggestions on valid search query
        } catch (err) {
          setError('Error fetching tags');
          setLoading(false);
          setShowSuggestions(false); // Hide suggestions on error
        }
      } else {
        setTags([]);
        setShowSuggestions(false);   // Hide suggestions if search query is empty
      }
    };

    fetchTags();
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectTag = (tagName: string) => {
    setSearchQuery(tagName);
    setShowSuggestions(false);  // Hide suggestions after selecting a tag
  };

  return (
    <div className="autocomplete ml-3 mr-3">
      <input
        className="input"
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleSearch}
        onFocus={() => setShowSuggestions(true)}  // Show suggestions when input is focused
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}  // Delay hiding to allow clicks
        style={{ marginBottom: '1rem' }}
      />

      {/* Autocomplete Dropdown */}
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
                style={{ cursor: 'pointer' }}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no results */}
      {showSuggestions && searchQuery && tags.length === 0 && !loading && (
        <div className="autocomplete-dropdown box">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default TagSearchBar;