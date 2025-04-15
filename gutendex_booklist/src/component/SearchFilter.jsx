import React, { useCallback, useMemo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const SearchFilter = ({
  search,
  setSearch,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedTopic,
  setSelectedTopic,
  searchTopic,
  setSearchTopic,
  topicList,
  setCurrentSelectedPage,
}) => {
  const handleSearch = useCallback(
    (value = "") => {
      setSearch(value);
      setCurrentSelectedPage(1);
    },
    []
  );

  const handleTopicChange = useCallback(
    (value = "") => {
      setSelectedTopic(value);
      setSearchTopic("");
      setIsDropdownOpen(false);
      setCurrentSelectedPage(1);
    },
    []
  );
  
  const filteredTopics = useMemo(
    () =>
      topicList.filter((item) =>
        item?.toLowerCase().includes(searchTopic.toLowerCase())
      ),
    [topicList, searchTopic]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => handleSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <AiOutlineClose className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Topic Filter Dropdown */}
      <div className="flex-1 relative">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex justify-between items-center cursor-pointer"
        >
          <span className="truncate max-w-[70%]">{selectedTopic || "Filter by topic"}</span>
          <div className="flex items-center flex-shrink-0">
            {selectedTopic && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTopicChange("");
                }}
                className="mr-2 text-gray-500 hover:text-gray-700"
                aria-label="Clear topic filter"
              >
                <AiOutlineClose className="h-5 w-5" />
              </button>
            )}
            <MdKeyboardArrowDown
              className={`w-5 h-5 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full px-3 py-1 border border-gray-200 rounded-md text-sm"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
              />
            </div>

            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <div
                  key={topic}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    selectedTopic === topic ? "bg-blue-50 text-blue-600" : ""
                  }`}
                  onClick={() => handleTopicChange(topic)}
                >
                  <span className="truncate block">{topic}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No topics found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchFilter);
