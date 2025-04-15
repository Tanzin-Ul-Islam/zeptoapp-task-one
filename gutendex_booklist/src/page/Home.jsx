import React, { useEffect, useState } from "react";
import BookCard from "../component/BookCard";
import useBook from "../hook/useBook";
import BookListSkeleton from "../component/skeleton/BookListSkeleton";
import Pagination from "../component/Pagination";
import useDebounce from "../hook/useDebounce";
import SearchFilter from "../component/SearchFilter";
import Constants from "../constants";
import usePaginate from "../hook/usePaginate";
import { useSearchParams } from "react-router-dom";
import useDidMountEffect from "../hook/useDidMountEffect";
export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 700);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get("topic") || ""
  );
  const [searchTopic, setSearchTopic] = useState("");
  const {
    topicList,
    useBookQuery,
    useAllBookQuery,
    getBookTopics,
    updateParams,
  } = useBook();
  const {
    currentSelectedPage,
    setCurrentSelectedPage,
    handleBookPagination,
    getTotalPages,
  } = usePaginate();

  const { data, isLoading, isError } = useBookQuery({
    enabled: !!(debouncedSearch || selectedTopic),
  });
  const { count, results: books = [] } = data || {};

  const { data: allBooksData } = useAllBookQuery();
  const { results: allBooks = [] } = allBooksData || {};

  useEffect(() => {
    if (allBooks?.length > 0 && !topicList.length) getBookTopics(allBooks);
  }, [allBooks]);

  useDidMountEffect(() => {
    updateParams({
      search: debouncedSearch,
      topic: selectedTopic,
      page: currentSelectedPage,
    });
  }, [debouncedSearch, selectedTopic, currentSelectedPage]);

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p>Failed to fetch books. Please try reload the page.</p>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md mt-2"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Books</h2>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        searchTopic={searchTopic}
        setSearchTopic={setSearchTopic}
        topicList={topicList}
        setCurrentSelectedPage={setCurrentSelectedPage}
      />
      {!isLoading ? (
        <>
          {books?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books?.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src="/book.jpg"
                alt="No Books Found"
                className="w-48 h-48 mb-4"
              />
              <p className="text-xl font-bold text-gray-600">No books found</p>
            </div>
          )}

          {books?.length > 0 && (
            <Pagination
              totalPages={getTotalPages(count, Constants.HOME_LIMIT)}
              currentSelectedPage={currentSelectedPage}
              handleBookPagination={handleBookPagination}
            />
          )}
        </>
      ) : (
        <BookListSkeleton />
      )}
    </div>
  );
}
