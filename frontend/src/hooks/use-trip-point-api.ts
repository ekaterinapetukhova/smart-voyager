import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { CreateTripPoint, SwapTripPoints, UpdateTripPoint } from "../types/trip-point.types.ts";
import { tripQueryKey } from "./use-trip.ts";

const tripPointPath = "trip-point";

export const useTripPointAPI = () => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: async (tripPoint: CreateTripPoint) => {
      const { post } = authorizedFetch();

      return await post(tripPointPath, tripPoint);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const update = useMutation({
    mutationFn: async (tripPoint: UpdateTripPoint) => {
      const { put } = authorizedFetch();

      await put(tripPointPath, tripPoint);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const remove = useMutation({
    mutationFn: async (tripPointId: string) => {
      const { remove } = authorizedFetch();

      await remove(tripPointPath, tripPointId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const swap = useMutation({
    mutationFn: async (tripPointsIds: SwapTripPoints) => {
      const { post } = authorizedFetch();

      return await post(`${tripPointPath}/swap`, tripPointsIds);
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: [tripQueryKey] }),
  });

  return {
    addTripPoint: add.mutateAsync,
    deleteTripPoint: remove.mutateAsync,
    swapTripPoints: swap.mutateAsync,
    updateTripPoints: update.mutateAsync,
  };
};
