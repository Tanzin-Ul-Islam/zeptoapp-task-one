import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/api-core";
import api from "../api/api.json";

const useFont = () => {
  const fetchFonts = async ({ queryKey }) => {
    const [_key] = queryKey;
    let url = api.getAllFonts;
    return await getData({ url });
  };

  const useFontQuery = useQuery({
    queryKey: ["font"],
    queryFn: fetchFonts,
    keepPreviousData: true,
  });

  return {
    useFontQuery,
  };
};

export default useFont;
