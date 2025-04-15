import React from "react";
import ReactPaginate from "react-paginate";
export default function index({
  totalPages,
  currentSelectedPage,
  handleBookPagination,
}) {
  return (
    <ReactPaginate
      pageCount={totalPages || 1}
      forcePage={currentSelectedPage - 1 || 0}
      onPageChange={handleBookPagination}
      breakLabel="..."
      nextLabel="Next"
      previousLabel="Previous"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName="flex items-center justify-center gap-1 mt-8 mb-4 text-sm list-none"
      pageClassName="flex"
      pageLinkClassName="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      activeClassName="bg-blue-50 border-blue-200"
      activeLinkClassName="text-blue-600 font-medium"
      previousClassName="mr-2"
      nextClassName="ml-2"
      previousLinkClassName="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      nextLinkClassName="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      disabledClassName="opacity-50 pointer-events-none"
      breakClassName="mx-1"
      breakLinkClassName="px-2 py-1.5"
    />
  );
}
