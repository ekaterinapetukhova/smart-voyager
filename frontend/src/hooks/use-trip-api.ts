import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatedTrip, Trip } from "../types/trip.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

const path = "trip";
export const tripQueryKey = "trip";

export const useTripApi = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: [tripQueryKey],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const trips: Trip[] = await get(path);

      return trips;
    },
  });

  const add = useMutation({
    mutationFn: async (tripDto: CreatedTrip) => {
      const { post } = authorizedFetch();

      const trip: Trip = await post(path, tripDto);

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
    queryKey: [path],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const trips: Trip[] = await get(`me/trips`);

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
