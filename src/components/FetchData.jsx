import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./fechdata.css";

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=20"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    // style.background-color:${red};
    setIsActive(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <div className="data">
          <ul>
            {currentPosts.map((post) => (
              <div className="data-box">
                <li key={post.id}>
                  <h2>{post.id}</h2>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="page">
        <div className="button">
          <button
            className="Btn-pn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev{" "}
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              id="btn"
              className={index + 1 === isActive ? "active" : ""}
              key={index + 1}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="Btn-pn  "
            disabled={currentPage === 4}
            onClick={() => setCurrentPage(currentPage + 1) }
          >
            Next
          </button>
        </div>
      </div>
      
    </>
  );
}

export default FetchData;
