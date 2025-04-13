import React, { useState } from "react";
import Toast from "../../utils/toast";
import useFontGroup from "../../hook/useFontGroup";
import FontGroupModal from "../FontGroupModal";

export default function DisplayFontGroupList({ fontList, fontGroupList }) {
  const { useDeleteFontGroup } = useFontGroup();
  const { mutate: deleteFontGroup } = useDeleteFontGroup();
  const getFontsNameToDisplay = (list) => {
    return list?.map((font) => font.font_name).join(", ");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const handleOpenModal = (arg) => {
    setSelectedGroup(arg);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGroup({});
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
    <>
      <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6 overflow-x-auto mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          Our Font Groups
        </h1>
        <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
          List of all available font groups.
        </p>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Fonts
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {fontGroupList.map((group, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base font-semibold">
                    {group?.name}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 text-sm sm:text-base break-words">
                    {getFontsNameToDisplay(group?.fonts)}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                    {group?.fonts?.length}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleOpenModal(group);
                      }}
                      className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteGroup(group?.id)}
                      className="text-red-600 hover:underline bg-transparent border-none cursor-pointer"
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
      <FontGroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fontList={fontList}
        selectedGroup={selectedGroup}
      />
    </>
  );
}
