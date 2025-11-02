interface CountryAndCitiesResponse {
  data: {
    country: string;
    cities: string[];
  }[];
}

export const getCountriesAndCities = async () => {
  const response = await fetch("/cities.json");

  const countryAndCities: CountryAndCitiesResponse = await response.json();

  return countryAndCities;
};
