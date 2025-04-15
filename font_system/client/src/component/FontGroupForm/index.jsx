import React, { useEffect, useState } from "react";
import Toast from "../../utils/toast";
import useFontGroup from "../../hook/useFontGroup";
import Loader from "../Loader";
export default function FontGroupForm({
  fontList,
  isEdit = false,
  onClose = () => {},
  selectedGroup = {},
}) {
  const { usePostFontGroupQuery, useUpdateFontGroupQuery } = useFontGroup();
  const { mutate } = usePostFontGroupQuery();
  const [showLoader, setShowLoader] = useState(false);
  const { mutate: updateMutate } = useUpdateFontGroupQuery();

  const [groupTitle, setGroupTitle] = useState("");
  const [fonts, setFonts] = useState([{ id: "", name: "" }]);
  useEffect(() => {
    if (selectedGroup?.name) {
      setGroupTitle(selectedGroup?.name);
    }
    if (selectedGroup?.fonts?.length > 0) {
      setFonts(
        selectedGroup?.fonts.map((font) => ({
          id: font.id,
          name: font.font_name,
        }))
      );
    }
  }, [selectedGroup]);

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

  const handleClearFields = () => {
    setGroupTitle("");
    setFonts([{ id: "", name: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setShowLoader(true);
      const payLoad = {
        name: groupTitle,
        fonts: fonts.map((font) => font.id),
      };
      mutate(payLoad, {
        onSuccess: (data) => {
          setShowLoader(false);
          if (data?.success) {
            Toast("success", data?.message || "Group created successfully");
            handleClearFields();
            onClose();
          } else {
            Toast(
              "error",
              data?.message || "Something went wrong. Please try again."
            );
          }
        },
        onError: () => {
          setShowLoader(false);
          Toast("error", "Something went wrong. Please try again.");
        },
      });
    }
    return;
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (isValid()) {
      setShowLoader(true);
      const payLoad = {
        group_id: selectedGroup?.id,
        name: groupTitle,
        fonts: fonts.map((font) => font.id),
      };
      updateMutate(payLoad, {
        onSuccess: (data) => {
          setShowLoader(false);
          if (data?.success) {
            Toast("success", data?.message || "Group created successfully");
            handleClearFields();
            onClose();
          } else {
            Toast(
              "error",
              data?.message || "Something went wrong. Please try again."
            );
          }
        },
        onError: () => {
          setShowLoader(false);
          Toast("error", "Something went wrong. Please try again.");
        },
      });
    }
    return;
  };

  return (
    <>
      {showLoader && <Loader />}
      <form
        onSubmit={!isEdit ? handleSubmit : handleUpdate}
        className="p-4 sm:p-6"
      >
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
        >
          + Add Row
        </button>

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </>
  );
}
