import React from "react";

import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <FaSpinner className="text-white text-6xl animate-spin" />
    </div>
  );
};

export default Loader;
