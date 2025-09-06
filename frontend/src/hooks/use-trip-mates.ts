import { useQuery } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { User } from "../types/user.types.ts";

export const useTripMates = () => {
  const PATH = "trip-mates";

  const getAll = useQuery({
    queryKey: [PATH],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const response = await get(PATH);

      return (await response.json()) as User[];
    },
  });

  return {
    ...getAll,
  };
};
