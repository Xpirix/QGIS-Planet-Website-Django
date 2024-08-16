import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, PostResponse } from "../types/post"; // Adjust the import path as necessary

const PaginatedPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<PostResponse>(
        "http://localhost:62202/api/",
        {
          params: { page, page_size: pageSize },
        }
      );
      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1 className="title is-2">Posts</h1>
      {loading && <p className="notification is-info">Loading...</p>}
      {error && <p className="notification is-danger">{error}</p>}
      <div >
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="media">
              <div className="media-content">
                <h2 className="title is-4">{post.title}</h2>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <a
                  className="button is-link"
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <button
          className={`pagination-previous button ${
            page === 1 ? "is-disabled" : ""
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className={`pagination-next button ${
            page === totalPages ? "is-disabled" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
        <ul className="pagination-list">
          <li>
            <span
              className="pagination-link"
              aria-label="Page {page} of {totalPages}"
            >
              Page {page} of {totalPages}
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedPostList;
