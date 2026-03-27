import React from "react";

const ProductsListSkeleton = () => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto animate-pulse">
      {/* Table Header */}
      <div className="bg-gray-700 px-6 py-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="h-4 bg-gray-600 rounded w-20"></div>
          <div className="h-4 bg-gray-600 rounded w-16"></div>
          <div className="h-4 bg-gray-600 rounded w-20"></div>
          <div className="h-4 bg-gray-600 rounded w-20"></div>
          <div className="h-4 bg-gray-600 rounded w-20"></div>
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-700">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 px-6 py-5 items-center">
            {/* Product image + name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="h-4 bg-gray-700 rounded w-20"></div>
            </div>

            {/* Price */}
            <div className="h-4 bg-gray-700 rounded w-16"></div>

            {/* Category */}
            <div className="h-4 bg-gray-700 rounded w-20"></div>

            {/* Featured */}
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>

            {/* Actions */}
            <div className="w-8 h-8 bg-gray-700 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-gray-700">
        <div className="h-10 w-24 bg-gray-700 rounded-lg"></div>
        <div className="h-4 w-40 bg-gray-700 rounded"></div>
        <div className="h-10 w-24 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ProductsListSkeleton;