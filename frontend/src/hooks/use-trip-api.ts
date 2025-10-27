import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatedTrip, Trip, UpdateTripDto } from "../types/trip.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";

const path = "trip";
export const tripQueryKey = "trip";

export const useTripApi = () => {
  const queryClient = useQueryClient();

  const getAllPlanned = useQuery({
    queryKey: [tripQueryKey],
    queryFn: async () => {
      const request = authorizedFetch();

      const trips: Trip[] = await request({ method: "GET", path: `${path}/planned` });

      return trips;
    },
  });

  const getAllDrafts = useQuery({
    queryKey: [tripQueryKey, "drafts"],
    queryFn: async () => {
      const request = authorizedFetch();

      const trips: Trip[] = await request({ method: "GET", path: `${path}/drafts` });

      return trips;
    },
  });

  const add = useMutation({
    mutationFn: async (tripDto: CreatedTrip) => {
      const request = authorizedFetch();

      const trip: Trip = await request({ data: tripDto, method: "POST", path });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const update = useMutation({
    mutationFn: async (tripDto: UpdateTripDto) => {
      const request = authorizedFetch();

      const trip: Trip = await request({ data: tripDto, method: "PATCH", path: `${path}/${tripDto.id}` });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  // const remove = useMutation({
  //   mutationFn: deleteRoutePoint,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routePoint"] }),
  // });

  return {
    plannedTrips: getAllPlanned,
    draftTrips: getAllDrafts,
    addTrip: add,
    updateTrip: update,
    // deletePoint: remove.mutateAsync,
  };
};

export const useTripById = (tripId: string) => {
  return useQuery({
    queryKey: [tripQueryKey, tripId],
    queryFn: async () => {
      const request = authorizedFetch();

      const trip: Trip = await request({
        path: `${path}/${tripId}`,
        method: "GET",
      });

      return trip;
    },
  });
};
