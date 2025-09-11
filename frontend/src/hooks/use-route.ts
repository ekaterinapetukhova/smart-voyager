import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatedRoute, Route } from "../types/route.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

export const useRoute = () => {
  const queryClient = useQueryClient();

  const PATH = `route`;
  const QUERY_KEY = "route";

  const getAll = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const response = await get(PATH);

      return (await response.json()) as Route[];
    },
  });

  const add = useMutation({
    mutationFn: async (route: CreatedRoute) => {
      const { post } = authorizedFetch();

      const response = await post(PATH, route);

      return (await response.json()) as Route;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  // const remove = useMutation({
  //   mutationFn: deleteRoutePoint,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routePoint"] }),
  // });

  return {
    ...getAll,
    addRoute: add.mutateAsync,
    // deletePoint: remove.mutateAsync,
  };
};
