import { useState, useCallback, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import useFont from "../../hook/useFont";
import Toast from "../../utils/toast";
const FileUpload = () => {
  const { usePostFont } = useFont();
  const { mutate, isPending, isSuccess, isError } = usePostFont();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith(".ttf")) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file && file.name.endsWith(".ttf")) {
        setSelectedFile(file);
      }
    },
    [selectedFile]
  );

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }, []);

  const handleUploadFile = useCallback(() => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("fontName", selectedFile.name.replace(".ttf", ""));
    formData.append("fontFile", selectedFile);

    mutate(formData, {
      onSuccess: () => {
        Toast("success", "File uploaded successfully");
        handleClearFile();
      },
      onError: () => {
        Toast("error", "Something went wrong. Please try again.");
      },
    });
  }, [selectedFile, mutate, handleClearFile]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div
        className={`w-[70%] mx-auto border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".ttf"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center space-y-4 w-full"
        >
          <FiUpload className="h-16 w-16 text-gray-400" />
          <p className="text-gray-600 text-lg">
            {selectedFile?.name ? (
              selectedFile?.name
            ) : (
              <>Click to upload or drag and drop</>
            )}
          </p>
          <p className="text-sm text-gray-500">Only TTF File Allowed</p>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 w-[70%] flex flex-col items-center gap-4">
          <div className="p-3 bg-green-50 text-green-700 rounded-md w-full text-center flex items-center justify-between">
            <span>Selected file: {selectedFile.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleClearFile()}
                className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUploadFile()}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
