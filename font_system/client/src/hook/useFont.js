import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getData, postData } from "../api/api-core";
import api from "../api/api.json";

const useFont = () => {
  const fetchFonts = async ({ queryKey }) => {
    const [_key] = queryKey;
    let url = api.getAllFonts;
    return await getData({ url });
  };
  const postFont = async (formData) => {
    let url = api.createFonts;
    return await postData({ url, payLoad: formData });
  };
  const deleteFont = async (id) => {
    let url = api.deleteFonts;
    return await deleteData({ url, id });
  };

  const useFontQuery = useQuery({
    queryKey: ["font"],
    queryFn: fetchFonts,
    keepPreviousData: true,
  });
  const usePostFontQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: postFont,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["font"] });
      },
      onError: (error) => {
        console.error("Font upload error:", error);
      },
    });
  };

  const useDeleteFontQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteFont,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["font"] });
        queryClient.invalidateQueries({ queryKey: ["font_group"] });
      },
    });
  };

  return {
    useFontQuery,
    usePostFontQuery,
    useDeleteFontQuery,
  };
};

export default useFont;
