import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatedTrip, Trip } from "../types/trip.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

const PATH = `route`;
const QUERY_KEY = "route";

export const useTrip = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const response = await get(PATH);

      return (await response.json()) as Trip[];
    },
  });

  const add = useMutation({
    mutationFn: async (trip: CreatedTrip) => {
      const { post } = authorizedFetch();

      const response = await post(PATH, trip);

      return (await response.json()) as Trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  // const remove = useMutation({
  //   mutationFn: deleteRoutePoint,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routePoint"] }),
  // });

  return {
    ...getAll,
    addTrip: add.mutateAsync,
    // deletePoint: remove.mutateAsync,
  };
};

export const useTripsByUser = () => {
  return useQuery({
    queryKey: [PATH],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const response = await get(`me/routes`);

      if (!response.ok) throw new Error("Failed to fetch trip by user's id");

      return (await response.json()) as Trip[];
    },
  });
};

export const useTripsById = (tripId: string) => {
  return useQuery({
    queryKey: [PATH],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const response = await get(`trip/${tripId}`);

      if (!response.ok) throw new Error("Failed to fetch trip by it's id");

      return (await response.json()) as Trip;
    },
  });
};
