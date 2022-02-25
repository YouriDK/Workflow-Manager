import React from "react";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ list, itemsPerPage, handlePageChange }) => (
  <div className="pagination-block">
    <ReactPaginate
      nextLabel={"Afficher plus"}
      nextClassName="pagination-next-button"
      previousClassName="pagination-previous-button"
      nextLinkClassName="pagination-button-text"
      pageClassName="pagination-page-button"
      pageLinkClassName="pagination-button-text"
      activeClassName="pagination-page-button-active"
      activeLinkClassName="pagination-active-button-text"
      pageCount={ list.length !== null  ? Math.ceil(list.length / itemsPerPage) : 2 }
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={"custom-pagination pagination"}
      subContainerClassName={"pages pagination"}
    />
  </div>
);

export default CustomPagination;
