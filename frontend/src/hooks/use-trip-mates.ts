import { useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { User } from "../types/user.types.ts";

export const useTripMates = () => {
  const path = "trip-mates";

  const getAll = useQuery({
    queryKey: [path],
    queryFn: async () => {
      const request = authorizedFetch();

      const tripMates: User[] = await request({ path, method: "GET" });

      return tripMates;
    },
  });

  return {
    ...getAll,
  };
};
