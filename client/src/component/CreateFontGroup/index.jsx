import React from "react";
import FontGroupForm from "../FontGroupForm";
export default function CreateFontGroup({ fontList }) {
  return (
    <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 mb-4">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Create Font Group
      </h1>
      <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
        You have to select at least two fonts
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <FontGroupForm fontList={fontList} />
      </div>
    </div>
  );
}
