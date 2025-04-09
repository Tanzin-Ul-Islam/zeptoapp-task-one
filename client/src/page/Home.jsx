import React, { useState } from "react";
import BrowseFile from "../component/BrowseFile";
import useFont from "../hook/useFont";
import DisplayFont from "../component/DisplayFont";
export default function Home() {
  const { useFontQuery } = useFont();
  const { data, isLoading, isError } = useFontQuery;
  console.log(data);
  const { data: fonts = [] } = data || {};
  return (
    <div>
      <BrowseFile />
      <div className="w-[69%] mx-auto border-2 mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Fonts</h1>
        <p className="text-gray-600 mb-8">
          Browse a list of Zepto fonts to build your font group.
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  FONT NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PREVIEW
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fonts.map((font) => (
                <tr key={font.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {font?.font_name || "No font name available"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DisplayFont font={font} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => {}}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
