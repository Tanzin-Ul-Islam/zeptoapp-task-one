import React from "react";
import Toast from "../../utils/toast";
import useFontGroup from "../../hook/useFontGroup";

export default function DisplayFontGroupList({ fontGroupList }) {
  const { useDeleteFontGroup } = useFontGroup();
  const { mutate: deleteFontGroup } = useDeleteFontGroup();
  const getFontsNameToDisplay = (list) => {
    return list?.map((font) => font.font_name).join(", ");
  };
  const handleDeleteGroup = (id) => {
    deleteFontGroup(id, {
      onSuccess: () => {
        Toast("success", "Group deleted successfully");
      },
      onError: () => {
        Toast("error", "Something went wrong. Please try again.");
      },
    });
  };
  return (
    <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 overflow-x-auto mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Our Font Groups
      </h1>
      <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
        List of all available font groups.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Name</th>
              <th className="text-left px-4 py-2 font-medium">Fonts</th>
              <th className="text-left px-4 py-2 font-medium">Count</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {fontGroupList.map((group, index) => (
              <tr key={index}>
                <td className="px-4 py-2 font-semibold">{group?.name}</td>
                <td className="px-4 py-2">
                  {getFontsNameToDisplay(group?.fonts)}
                </td>
                <td className="px-4 py-2">{group?.fonts?.length}</td>
                <td className="px-4 py-2 space-x-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    Edit
                  </a>
                  <a
                    href="#"
                    onClick={() => handleDeleteGroup(group?.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
