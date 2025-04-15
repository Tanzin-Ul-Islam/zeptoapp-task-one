import React, { useEffect, useState } from "react";
import BookCard from "../component/BookCard";
import useWishlist from "../hook/useWishlist";
import BookListSkeleton from "../component/skeleton/BookListSkeleton";
import Pagination from "../component/Pagination";
import Constants from "../constants";
import usePaginate from "../hook/usePaginate";
import useDidMountEffect from "../hook/useDidMountEffect";
export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [previousWishlistLength, setPreviousWishlistLength] = useState(0);
  const {
    currentSelectedPage,
    getTotalPages,
    handleBookPagination,
    startIndex,
    endIndex,
    getStartAndEndIndex,
  } = usePaginate();

  useEffect(() => {
    if (wishlist?.length !== previousWishlistLength) {
      getStartAndEndIndex(wishlist?.length, Constants.WISHLIST_LIMIT);
      setPreviousWishlistLength(wishlist?.length);
    }
  }, [wishlist]);

  useDidMountEffect(() => {
    getStartAndEndIndex(wishlist?.length, Constants.WISHLIST_LIMIT);
  }, [currentSelectedPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Wishlist</h2>
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist?.slice(startIndex, endIndex)?.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <img
            src="/empty-wishlist.svg"
            alt="Empty Wishlist"
            className="w-48 h-48 mb-4"
          />
          <p className="text-xl font-bold text-gray-600">Wishlist is empty</p>
        </div>
      )}

      {wishlist?.length > 0 && (
        <Pagination
          totalPages={getTotalPages(wishlist?.length, Constants.WISHLIST_LIMIT)}
          currentSelectedPage={currentSelectedPage}
          handleBookPagination={handleBookPagination}
        />
      )}
    </div>
  );
}
