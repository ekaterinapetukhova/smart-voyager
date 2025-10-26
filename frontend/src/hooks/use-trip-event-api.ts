import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { CreateTripEventDto, TripEvent } from "../types/trip-event.types.ts";
import { tripQueryKey } from "./use-trip-api.ts";

export const useTripEventApi = () => {
  const queryClient = useQueryClient();

  const path = "trip-event";

  const add = useMutation({
    mutationFn: async (data: CreateTripEventDto) => {
      const request = authorizedFetch();

      const response: TripEvent = await request({ method: "POST", path, data });

      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [tripQueryKey] }),
  });

  return {
    createEvent: add,
  };
};
