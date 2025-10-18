import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatedTrip, Trip } from "../types/trip.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

const PATH = "route";
export const tripQueryKey = "route";

export const useTrip = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: [tripQueryKey],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const trips: Trip[] = await get(PATH);

      return trips;
    },
  });

  const add = useMutation({
    mutationFn: async (tripDto: CreatedTrip) => {
      const { post } = authorizedFetch();

      const trip: Trip = await post(PATH, tripDto);

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
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

      const trips: Trip[] = await get(`me/routes`);

      return trips;
    },
  });
};

export const useTripById = (tripId: string) => {
  return useQuery({
    queryKey: [tripQueryKey, tripId],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const trips: Trip = await get(`route/${tripId}`);

      return trips;
    },
  });
};
