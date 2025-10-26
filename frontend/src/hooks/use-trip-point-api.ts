import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { CreateTripPoint, SwapTripPoints, UpdateTripPoint } from "../types/trip-point.types.ts";
import { tripQueryKey } from "./use-trip-api.ts";

const path = "trip-point";

export const useTripPointAPI = () => {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: async (tripPoint: CreateTripPoint) => {
      const request = authorizedFetch();

      return await request({ path, data: tripPoint, method: "POST" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const update = useMutation({
    mutationFn: async (tripPoint: UpdateTripPoint) => {
      const request = authorizedFetch();

      await request({ path: `${path}/${tripPoint.id}`, data: tripPoint, method: "PUT" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const remove = useMutation({
    mutationFn: async (tripPointId: string) => {
      const request = authorizedFetch();

      await request({ path: `${path}/${tripPointId}`, method: "DELETE" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  const swap = useMutation({
    mutationFn: async (tripPointsIds: SwapTripPoints) => {
      const request = authorizedFetch();

      return await request({
        path: `${path}/swap`,
        data: tripPointsIds,
        method: "POST",
      });
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: [tripQueryKey] }),
  });

  return {
    addTripPoint: add.mutateAsync,
    deleteTripPoint: remove.mutateAsync,
    swapTripPoints: swap.mutateAsync,
    updateTripPoint: update.mutateAsync,
  };
};
