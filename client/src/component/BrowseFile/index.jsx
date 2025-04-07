import { useState, useCallback } from "react";
import { FiUpload } from "react-icons/fi";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".ttf")) {
      setSelectedFile(file);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div
        className={`w-1/2 mx-auto border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
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
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center space-y-4 w-full"
        >
          <FiUpload className="h-16 w-16 text-gray-400" />
          <p className="text-gray-600 text-lg">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">Only TTF File Allowed</p>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md w-full text-center">
          Selected file: {selectedFile.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
