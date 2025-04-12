import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getData, postFormData } from "../api/api-core";
import api from "../api/api.json";

const useFontGroup = () => {
  const fetchFontGroups = async ({ queryKey }) => {
    const [_key] = queryKey;
    let url = api.getAllFonts;
    return await getData({ url });
  };
  const postFontGroup = async (payload) => {
    let url = api.createFonts;
    return await postFormData({ url, payload });
  };
  const deleteFontGroup = async (id) => {
    let url = api.deleteFonts;
    return await deleteData({ url, id });
  };

  const useFontQuery = useQuery({
    queryKey: ["font_group"],
    queryFn: fetchFontGroups,
    keepPreviousData: true,
  });
  const usePostFontGroupQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: postFontGroup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["font_group"] });
      },
      onError: (error) => {
        console.error('Font upload error:', error);
      }
    });
  };

  const useDeleteFontGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteFontGroup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["font"] });
      },
    });
  };

  return {
    useFontQuery,
    usePostFontGroupQuery,
    useDeleteFontGroup,
  };
};

export default useFontGroup;
