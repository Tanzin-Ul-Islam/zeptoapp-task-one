import React from "react";
import BrowseFile from "../component/BrowseFile";
import useFont from "../hook/useFont";
import DisplayFontList from "../component/DisplayFontList";
import DisplayFontGroupList from "../component/DisplayFontGroupList";
import useFontGroup from "../hook/useFontGroup";
import CreateFontGroup from "../component/CreateFontGroup";
export default function Home() {
  const { useFontQuery } = useFont();
  const { useFontGroupQuery } = useFontGroup();

  const { data, isLoading } = useFontQuery;
  const { data: fonts = [] } = data || {};
  const { data: fontGroupData, isLoading: isFontGroupLoading } =
    useFontGroupQuery;
  const { data: fontGroupList = [] } = fontGroupData || {};

  return (
    <div>
      <BrowseFile />
      <DisplayFontList isLoading={isLoading} fonts={fonts || []} />
      <CreateFontGroup fontList={fonts || []} />
      <DisplayFontGroupList
        isFontGroupLoading={isFontGroupLoading}
        fontList={fonts || []}
        fontGroupList={fontGroupList || []}
      />
    </div>
  );
}
