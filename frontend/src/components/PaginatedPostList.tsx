import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, PostResponse } from "../types/post"; // Adjust the import path as necessary
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import TagSearchBar from "../components/TagSearch";

// Utility function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });
};

// Utility function to update the URL
const updateURL = (navigate: Function, page: number, tags: string[]) => {
  const tagsParam = tags.length > 0 ? `tags=${tags.join(",")}` : "";
  navigate(`?page=${page}${tagsParam ? `&${tagsParam}` : ""}`);
};

const PaginatedPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // Constant value, no need for state
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Parse the current URL for page and tags
  useEffect(() => {
    const { page: queryPage, tags } = queryString.parse(location.search);
    setPage(parseInt(queryPage as string) || 1);
    setSelectedTags((tags as string)?.split(",") || []);
  }, [location.search]);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<PostResponse>("http://localhost:62202/api/", {
        params: { page, page_size: pageSize, tags: selectedTags.join(",") },
      });
      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, selectedTags]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      updateURL(navigate, newPage, selectedTags);
    }
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      updateURL(navigate, 1, updatedTags);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    updateURL(navigate, page, updatedTags);
  };

  return (
    <div className="container">
      <TagSearchBar onTagSelect={handleTagSelect} />
      {loading && <p className="notification is-info">Loading...</p>}
      {error && <p className="notification is-danger">{error}</p>}

      {/* Tag Display */}
      <div className="field is-grouped is-grouped-multiline m-3">
        {selectedTags.length > 0 && <span>Tags:</span>}
        {selectedTags.map((tag) => (
          <div className="control" key={tag}>
            <div className="tags has-addons">
              <span className="tag is-warning">{tag}</span>
              <button
                className="tag is-delete"
                onClick={() => handleTagRemove(tag)}
              />
            </div>
          </div>
        ))}
      </div>

      <ul>
        {posts.map((post) => (
          <li className="media box">
            <div className="media-content">
              <h2 className="title is-4">{post.title}</h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div>
                {post.tags.map((tag) => (
                  <a
                    className="tag is-warning mr-2"
                    onClick={() => handleTagSelect(tag)}
                    key={tag}
                  >
                    {tag}
                  </a>
                ))}
              </div>
              <nav className="level mt-3">
                <div className="level-left">
                  <div className="level-item">
                    <a
                      className="button is-link"
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View post
                    </a>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item is-size-7 is-italic">
                    By{'\u00A0'}
                    <span className="has-text-weight-semibold">
                      {post.author}
                    </span>{'\u00A0'}
                    on {formatDate(post.date_modified)}
                  </div>
                </div>
              </nav>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        tags={selectedTags}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedPostList;