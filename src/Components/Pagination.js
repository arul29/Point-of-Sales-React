import React from "react";
import "./../Css/Pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination" style={{ paddingLeft: 10 }}>
      <a
        href="#!"
        disabled={currentPage === 1 ? true : false}
        onClick={() => paginate(currentPage - 1)}
      >
        &laquo;
      </a>
      {pageNumbers.map(number => (
        <a key={number}
          onClick={() => paginate(number)}
          href="#!"
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </a>
      ))}
      <a
        href="#!"
        disabled={
          currentPage === Math.ceil(totalPosts / postsPerPage) ? true : false
        }
        onClick={() => paginate(currentPage + 1)}
      >
        &raquo;
      </a>
    </div>
  );
};

export default Pagination;
