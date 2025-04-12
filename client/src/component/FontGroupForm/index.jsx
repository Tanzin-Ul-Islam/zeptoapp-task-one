import React, { useState } from "react";
import Toast from "../../utils/toast";
export default function FontGroupForm({ fontList }) {
  const [groupTitle, setGroupTitle] = useState("");
  const [fonts, setFonts] = useState([{ id: "", name: "" }]);

  const handleChange = (index, value) => {
    const fontDetails = fontList.find((font) => font.id === value);
    if (!fontDetails) return;

    setFonts((prevFonts) =>
      prevFonts.map((font, i) =>
        i === index ? { id: value, name: fontDetails.font_name } : font
      )
    );
  };

  const addRow = () => {
    setFonts([...fonts, { id: "", name: "" }]);
  };

  const removeRow = (index) => {
    const updatedFonts = fonts.filter((_, i) => i !== index);
    setFonts(updatedFonts);
  };

  const isValid = () => {
    if (groupTitle.trim() === "") {
      Toast("warning", "GroupTitle required");
      return false;
    }
    if (fonts.length < 2) {
      Toast("warning", "At least two fonts are required");
      return false;
    }
    return fonts.every((font, index) => {
      if (font.id === "") {
        Toast("warning", "Font required font item " + (index + 1));
        return false;
      }
      return true;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      const fontGroup = {
        title: groupTitle,
        fonts: fonts.map((font) => ({ id: font.id, name: font.name })),
      };
      console.log("Font Group Created:", fontGroup);
    }
    return;
  };

  return (
    <div className="w-full md:w-[69%] mx-auto border-2 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Create Font Group
      </h1>
      <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
        You have to select at least two fonts
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <input
            type="text"
            placeholder="Group Title"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
            className="w-full mb-4 p-2 border rounded text-sm sm:text-base"
          />

          {fonts.map((font, index) => (
            <div
              key={index}
              className="w-full flex flex-wrap sm:flex-nowrap items-center gap-2 mb-3 border rounded-lg p-2 sm:h-[50px]"
            >
              <span className="w-6 text-center font-semibold">{index + 1}</span>
              <input
                type="text"
                placeholder="Font Name"
                value={font.name}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className="flex-1 min-w-[120px] p-2 border rounded text-sm pointer-events-none"
              />
              <select
                value={font?.id ?? ""}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className="flex-1 min-w-[120px] p-2 border rounded text-sm"
              >
                <option value="" hidden>
                  Select a Font
                </option>
                {fontList.map((fontItem, index) => (
                  <option
                    key={index}
                    value={fontItem.id}
                    disabled={fonts.some((f) => f.id === fontItem.id)}
                  >
                    {fontItem.font_name}
                  </option>
                ))}
              </select>
              {fonts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  &times;
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="border border-green-600 text-green-600 hover:bg-green-100 px-4 py-1 rounded mb-4 text-sm"
            disabled={fonts.length >= fontList.length}
          >
            + Add Row
          </button>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
