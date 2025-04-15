import {
  FaStar,
  FaRegStar,
  FaBookmark,
  FaShareAlt,
  FaArrowLeft,
} from "react-icons/fa";

const BookDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="mr-4 p-2 rounded-full bg-gray-200 animate-pulse">
            <FaArrowLeft className="h-5 w-5 text-transparent" />
          </div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover Skeleton */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white p-4 shadow-md rounded-lg h-full">
              <div className="w-full aspect-[2/3] bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Book Details Skeleton */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white p-6 shadow-md rounded-lg">
              {/* Title & Author Skeleton */}
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="p-2 text-transparent bg-gray-200 rounded-full animate-pulse">
                    <FaBookmark className="h-5 w-5" />
                  </div>
                  <div className="p-2 text-transparent bg-gray-200 rounded-full animate-pulse">
                    <FaShareAlt className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Rating Skeleton */}
              <div className="flex items-center mt-4 space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-gray-200 animate-pulse">
                      <FaStar className="h-5 w-5" />
                    </div>
                  ))}
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Price Skeleton */}
              <div className="mt-6 h-8 w-20 bg-gray-200 rounded animate-pulse"></div>

              {/* Buttons Skeleton */}
              <div className="mt-6 flex space-x-4">
                <div className="px-6 py-3 bg-gray-200 rounded-md animate-pulse w-32"></div>
                <div className="px-6 py-3 bg-gray-200 rounded-md animate-pulse w-32"></div>
              </div>

              {/* Description Skeleton */}
              <div className="mt-8 space-y-2">
                <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Details Skeleton */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailsSkeleton;
