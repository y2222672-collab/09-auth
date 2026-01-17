"use client";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (selectedPage: number) => void;
}

const Pagination = ({ totalPages, currentPage, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    onChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      previousLabel="←"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next}
      disabledClassName={css.disabled}
      breakClassName={css.break}
      pageLinkClassName={css.pageLink}
      previousLinkClassName={css.link}
      nextLinkClassName={css.link}
      breakLinkClassName={css.link}
    />
  );
};

export default Pagination;
