import React from "react";

export default function BookListSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            {/* Wishlist Icon Skeleton */}
            <div className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full animate-pulse">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>

            {/* Book Cover Image Skeleton */}
            <div className="h-48 md:h-56 overflow-hidden bg-gray-200 animate-pulse">
              <div className="w-full h-full bg-gray-300"></div>
            </div>

            {/* Book Details Skeleton */}
            <div className="p-4">
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 rounded-full animate-pulse mb-3 w-3/4"></div>

              {/* Author Skeleton */}
              <div className="h-4 bg-gray-200 rounded-full animate-pulse mb-1 w-1/2"></div>

              {/* Additional Info Skeleton (optional) */}
              <div className="flex justify-between mt-3">
                <div className="h-3 bg-gray-200 rounded-full animate-pulse w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded-full animate-pulse w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
