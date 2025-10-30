import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTripDto, Trip, UpdateTripDto } from "../types/trip.types.ts";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { CreateTripByAI } from "../validation/trip.validation.ts";

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

  const create = useMutation({
    mutationFn: async (tripDto: CreateTripDto) => {
      const request = authorizedFetch();

      const trip: Trip = await request({ data: tripDto, method: "POST", path });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const addTripMate = useMutation({
    mutationFn: async (params: { tripId: string; mateId: string }) => {
      const request = authorizedFetch();

      const trip: Trip = await request({
        method: "PUT",
        path: `${path}/${params.tripId}/collaborator/${params.mateId}`,
      });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const removeTripMate = useMutation({
    mutationFn: async (params: { tripId: string; mateId: string }) => {
      const request = authorizedFetch();

      const trip: Trip = await request({
        method: "DELETE",
        path: `${path}/${params.tripId}/collaborator/${params.mateId}`,
      });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const useCreateByAI = (onSuccess: (tripId: string) => void | Promise<void>) =>
    useMutation({
      mutationFn: async (tripDto: CreateTripByAI) => {
        const request = authorizedFetch();

        const { tripId } = (await request({ data: tripDto, method: "POST", path: `${path}/ai-create-trip` })) as {
          tripId: string;
        };

        return tripId;
      },
      onSuccess: (tripId) => {
        void queryClient.invalidateQueries({ queryKey: [tripQueryKey] });
        void onSuccess(tripId);
      },
    });

  const useCreateControlListByAI = () => {
    return useMutation({
      mutationFn: async (tripId: string) => {
        const request = authorizedFetch();

        await request({ method: "POST", path: `${path}/${tripId}/ai-create-control-list` });
      },
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [tripQueryKey] });
      },
    });
  };

  const update = useMutation({
    mutationFn: async (tripDto: UpdateTripDto) => {
      const request = authorizedFetch();

      const trip: Trip = await request({ data: tripDto, method: "PATCH", path: `${path}/${tripDto.id}` });

      return trip;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  return {
    plannedTrips: getAllPlanned,
    draftTrips: getAllDrafts,
    createTrip: create,
    useCreateByAI: useCreateByAI,
    useCreateControlListByAI: useCreateControlListByAI,
    updateTrip: update,
    addTripMate,
    removeTripMate,
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
