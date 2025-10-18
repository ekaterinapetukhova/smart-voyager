import { useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { User } from "../types/user.types.ts";

export const useTripMates = () => {
  const PATH = "trip-mates";

  const getAll = useQuery({
    queryKey: [PATH],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const tripMates: User[] = await get(PATH);

      return tripMates;
    },
  });

  return {
    ...getAll,
  };
};
