import React from "react";

const SkeletonBookDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-300 flex items-center justify-center py-12 px-6">
      {/* Book Card Skeleton */}
      <div className="max-w-3xl w-full p-6 bg-[#EDE7F6] shadow-lg rounded-lg border border-gray-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Cover Skeleton */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-64 bg-gray-300 animate-pulse rounded-lg" />
          </div>

          {/* Book Details Skeleton */}
          <div className="w-full md:w-2/3 space-y-2">
            <div className="h-6 bg-gray-300 animate-pulse rounded" />
            <div className="h-5 bg-gray-300 animate-pulse rounded" />
            <div className="h-5 bg-gray-300 animate-pulse rounded" />
            <div className="h-5 bg-gray-300 animate-pulse rounded" />
            <div className="h-5 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-6">
          <div className="h-5 bg-gray-300 animate-pulse rounded mb-2" />
          <div className="h-4 bg-gray-300 animate-pulse rounded mb-2" />
          <div className="h-4 bg-gray-300 animate-pulse rounded mb-2" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-6 flex gap-4">
          <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded" />
          <div className="w-1/2 h-10 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonBookDetail;