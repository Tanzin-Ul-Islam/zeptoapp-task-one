import React from "react";
import BrowseFile from "../component/BrowseFile";
import useFont from "../hook/useFont";
import DisplayFontList from "../component/DisplayFontList";
import FontGroupForm from "../component/FontGroupForm";
export default function Home() {
  const { useFontQuery } = useFont();
  const { data, isLoading, isError } = useFontQuery;
  const { data: fonts = [] } = data || {};

  return (
    <div>
      <BrowseFile />
      <DisplayFontList fonts={fonts} />
      <FontGroupForm fontList={fonts} />
    </div>
  );
}
