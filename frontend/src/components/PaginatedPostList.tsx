import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, PostResponse } from "../types/post"; // Adjust the import path as necessary
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

const PaginatedPostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Function to get the current query parameter
  const getQueryParam = (param: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  // Set page number from the URL query parameters
  useEffect(() => {
    const queryPage = getQueryParam("page");
    if (queryPage) {
      const pageNumber = parseInt(queryPage);
      if (!isNaN(pageNumber)) {
        setPage(pageNumber);
      }
    }
  }, [location.search]);

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

  // Fetch posts when the page changes
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Handle page change and update the URL query parameter
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`?page=${newPage}`); // Use navigate instead of history.push
    }
  };

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

  return (
    <div className="container">
      {loading && <p className="notification is-info">Loading...</p>}
      {error && <p className="notification is-danger">{error}</p>}
      <div>
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
                    <a className="tag is-warning mr-2">
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
                      at {formatDate(post.date_modified)}
                    </div>
                  </div>
                </nav>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedPostList;
