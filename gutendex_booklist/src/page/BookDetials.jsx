import { FaArrowLeft, FaDownload, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBook from "../hook/useBook";
import BookDetailsSkeleton from "../component/skeleton/BookDetailsSkeleton";
import { useState } from "react";
import useWishlist from "../hook/useWishlist";

const BookDetials = () => {
  let { bookId } = useParams();
  const navigate = useNavigate();
  const { getAuthorName } = useBook();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { useBookDetailsQuery, getSummaries } = useBook();

  const {
    data: book,
    isLoading,
    isError,
  } = useBookDetailsQuery({ bookId }, { enabled: !!bookId });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

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
    <>
      {!isLoading ? (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <FaArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Book Details
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="w-full md:w-1/3 lg:w-1/3">
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
                    <img
                      src="/blur.jpg"
                      alt="Blurred Image"
                      className="absolute inset-0 h-full w-full object-contain shadow-sm"
                      style={{
                        filter: "blur(15px)",
                        transition: "opacity 0.5s ease",
                        opacity: isImageLoaded ? 0 : 1,
                      }}
                    />
                    <img
                      src={book?.formats["image/jpeg"] || "/book_default.jpg"}
                      alt={book.title}
                      className="absolute inset-0 h-full w-full object-contain shadow-sm"
                      onLoad={handleImageLoad}
                      style={{
                        opacity: isImageLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {book.title}
                      </h1>
                      <p className="text-lg font-semibold text-gray-600 mt-1">
                        by {getAuthorName(book?.authors)}
                      </p>
                    </div>
                  </div>

                  {/* Price and Wishlist */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isInWishlist(book) ? (
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-blue-500 bg-blue-50 rounded-full hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
                          onClick={() => removeFromWishlist(book)}
                          aria-label="Remove from wishlist"
                        >
                          <FaHeart className="text-blue-500 text-xl" />
                          <span className="text-sm md:text-base">Remove from Wishlist</span>
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-blue-500 bg-blue-50 rounded-full hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
                          onClick={() => addToWishlist(book)}
                          aria-label="Add to wishlist"
                        >
                          <FaRegHeart className="text-gray-600 hover:text-blue-500 text-xl" />
                          <span className="text-sm md:text-base">Add to Wishlist</span>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <FaDownload className="text-xl text-gray-600" />
                      <span className="text-xl text-gray-900">
                        {book.download_count}
                      </span>
                    </div>
                  </div>

                  {/* Topics */}
                  {book?.subjects?.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">Related Topics</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {book?.subjects?.slice(0, 12).map((topic, index) => (
                          <Link
                            to={`/?topic=${encodeURIComponent(topic)}`}
                            key={index}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm truncate hover:bg-blue-100 transition-colors duration-200"
                          >
                            {topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {book?.summaries?.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Description
                      </h2>
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {getSummaries(book.summaries)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <BookDetailsSkeleton />
      )}
    </>
  );
};

export default BookDetials;
