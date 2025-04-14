import React, { useState } from "react";
import useFont from "../../hook/useFont";
import Toast from "../../utils/toast";
import DisplayFont from "../DisplayFont";
import ListSkeleton from "../skeleton/ListSkeleton";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Loader from "../Loader";
export default function DisplayFontList({ isLoading, fonts }) {
  const { useDeleteFontQuery } = useFont();
  const { mutate: deleteFont } = useDeleteFontQuery();
  const [showLoader, setShowLoader] = useState(false);
  const handleDeleteFont = (id) => {
    setShowLoader(true);
    deleteFont(id, {
      onSuccess: () => {
        setShowLoader(false);
        Toast("success", "Font deleted successfully");
      },
      onError: () => {
        setShowLoader(false);
        Toast("error", "Something went wrong. Please try again.");
      },
    });
  };
  return (
    <>
      {showLoader && <Loader />}
      {!isLoading ? (
        <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 overflow-x-auto mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Our Fonts
          </h1>
          <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
            Browse a list of Zepto fonts to build your font group.
          </p>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider ">
                    Font Name
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fonts.length > 0 ? (
                  fonts.map((font) => (
                    <tr key={font.id}>
                      <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                        <div className="font-semibold text-gray-900">
                          {font?.font_name || "No font name available"}
                        </div>
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                        <DisplayFont font={font} />
                      </td>
                      <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteFont(font?.id)}
                          className="text-red-600 hover:text-red-900 font-medium text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <HiOutlineEmojiSad className="h-12 w-12 text-gray-400" />
                        <p className="text-sm sm:text-base">No fonts found</p>
                        <p className="text-xs text-gray-400">
                          Upload a font to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ListSkeleton />
      )}
    </>
  );
}
