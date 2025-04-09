import React, { useEffect } from "react";
import api from "../../api/api.json";
export default function DisplayFont({ font }) {
  useEffect(() => {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    const fontFaceRules = `
      @font-face {
        font-family: '${font.font_name}';
        src: url('${font.file_path}') format('truetype');
      }
    `;

    styleElement.textContent = fontFaceRules;

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [font]);
  return (
    <div
      className="text-gray-500"
      style={{
        fontFamily: `'${font.font_name}', sans-serif`,
        fontSize: "16px",
      }}
    >
      The quick brown fox jumps over the lazy dog
    </div>
  );
}
