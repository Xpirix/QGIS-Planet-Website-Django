import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post, PostResponse } from "../types/post"; // Adjust the import path as necessary
import Pagination from './Pagination';

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
      {loading && <p className="notification is-info">Loading...</p>}
      {error && <p className="notification is-danger">{error}</p>}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="media box">
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
                  View post
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default PaginatedPostList;
