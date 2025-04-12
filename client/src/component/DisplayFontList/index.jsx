import React from "react";
import useFont from "../../hook/useFont";
import Toast from "../../utils/toast";
import DisplayFont from "../DisplayFont";

export default function DisplayFontList({ fonts }) {
  const { useDeleteFontQuery } = useFont();
  const { mutate: deleteFont } = useDeleteFontQuery();
  const handleDeleteFont = (id) => {
    deleteFont(id, {
      onSuccess: () => {
        Toast("success", "Font deleted successfully");
      },
      onError: () => {
        Toast("error", "Something went wrong. Please try again.");
      },
    });
  };
  return (
    <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 overflow-x-auto mb-4 sm:mb-6">
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
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Font Name
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fonts.map((font) => (
              <tr key={font.id}>
                <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                  <div className="font-medium text-gray-900">
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
