import { useQuery } from "@tanstack/react-query";
import { getCountriesAndCities } from "../utils/get-countries-and-cities.ts";

export const useCountriesAndCities = () =>
  useQuery({
    queryFn: getCountriesAndCities,
    queryKey: ["countriesAndCities"],
    staleTime: Infinity,
  });
