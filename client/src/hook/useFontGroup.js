import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getData, postData } from "../api/api-core";
import api from "../api/api.json";

const useFontGroup = () => {
  const fetchFontGroups = async ({ queryKey }) => {
    const [_key] = queryKey;
    let url = api.getAllFontGroup;
    return await getData({ url });
  };
  const postFontGroup = async (payLoad) => {
    let url = api.createFontGroup;
    return await postData({ url, payLoad: JSON.stringify(payLoad), });
  };
  const deleteFontGroup = async (id) => {
    let url = api.deleteFontGroup;
    return await deleteData({ url, id });
  };

  const useFontGroupQuery = useQuery({
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
        queryClient.invalidateQueries({ queryKey: ["font_group"] });
      },
    });
  };

  return {
    useFontGroupQuery,
    usePostFontGroupQuery,
    useDeleteFontGroup,
  };
};

export default useFontGroup;
