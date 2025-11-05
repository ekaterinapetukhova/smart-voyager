interface CountryAndCitiesResponse {
  data: {
    country: string;
    cities: string[];
  }[];
}

export const getCountriesAndCities = async () => {
  const response = await fetch("/cities.json");

  const countryAndCities: CountryAndCitiesResponse = await response.json();

  return countryAndCities.data;
};

export const prepareCountriesSelectOptions = (data: CountryAndCitiesResponse["data"]) => {
  return data.map((item) => ({
    name: item.country,
    value: item.country,
  }));
};

export const prepareCitiesSelectOptions = (data: CountryAndCitiesResponse["data"], country: string) => {
  const countryAndCities = data.find((item) => item.country === country);

  if (!countryAndCities) {
    return [];
  }

  return countryAndCities.cities.map((city) => ({
    name: city,
    value: city,
  }));
};
