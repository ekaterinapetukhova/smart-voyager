import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { useTripMates } from "../../hooks/use-trip-mates.ts";
import { SelectInput } from "../../components/common/SelectInput.tsx";
import { useCountriesAndCities } from "../../hooks/use-countries-and-cities.ts";
import { prepareCitiesSelectOptions, prepareCountriesSelectOptions } from "../../utils/get-countries-and-cities.ts";
import { Gender, TripGoals, tripGoals, TripInterest, tripInterest } from "../../types/user.types.ts";
import { mapObject } from "../../utils/map-object.ts";
import { CheckboxInput } from "../../components/common/CheckboxInput.tsx";
import { AutocompleteSelectInput } from "../../components/common/AutocompleteSelectInput.tsx";
import { TripMateCard } from "./TripMateCard.tsx";
import { TripMatesPopup } from "./TripMatesPopup.tsx";

export function TripMatesView() {
  const { data: tripMates } = useTripMates();

  const { data: countriesAndCities } = useCountriesAndCities();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTripMateId, setSelectedTripMateId] = useState("");

  const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<TripGoals[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<TripInterest[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);

  if (!tripMates) {
    return;
  }

  const filteredTripMates = tripMates.filter((tripMate) => {
    if (tripMate.shouldBeVisible) {
      const selectedOptions = [...selectedGoals, ...selectedInterests, ...selectedGenders];
      const tripMateOptions: typeof selectedOptions = [];

      if (selectedOptions.length !== 0) {
        if (selectedGoals.length !== 0) {
          for (const goal of tripMate.tripGoals) {
            if (selectedOptions.includes(goal as TripGoals)) {
              tripMateOptions.push(goal as TripGoals);
            }
          }
        }

        if (selectedInterests.length !== 0) {
          for (const interest of tripMate.tripInterest) {
            if (selectedOptions.includes(interest as TripInterest)) {
              tripMateOptions.push(interest as TripInterest);
            }
          }
        }

        if (selectedGenders.length !== 0 && selectedGenders.includes(tripMate.gender)) {
          tripMateOptions.push(tripMate.gender);
        }

        return selectedOptions.length === tripMateOptions.length;
      }

      return true;
    } else {
      return false;
    }
  });

  const renderTripMates = filteredTripMates.map((tripMate) => {
    if (selectedCountry && tripMate.country !== selectedCountry) {
      return;
    }

    if (selectedCity && tripMate.city !== selectedCity) {
      return;
    }

    return (
      <TripMateCard
        key={tripMate.id}
        tripMate={tripMate}
        onClick={() => {
          setShowPopup(true);
          setSelectedTripMateId(tripMate.id);
        }}
      />
    );
  });

  if (!countriesAndCities) {
    return;
  }

  const sortOptions = [
    {
      name: "Country and city",
      value: "countryAndCity",
    },
    {
      name: "Trip goals",
      value: "tripGoals",
    },
    {
      name: "Trip interests",
      value: "tripInterests",
    },
    {
      name: "Gender",
      value: "gender",
    },
  ];

  const countriesOptions = prepareCountriesSelectOptions(countriesAndCities);

  const citiesOptions = prepareCitiesSelectOptions(countriesAndCities, selectedCountry);

  const tripGoalsOptions = Object.values(
    mapObject(tripGoals, (name, value) => {
      return {
        name,
        value,
      };
    })
  );

  const tripInterestOptions = Object.values(
    mapObject(tripInterest, (name, value) => {
      return {
        name,
        value,
      };
    })
  );

  const genderOptions = [
    {
      name: "Female",
      value: Gender.Female,
    },
    {
      name: "Male",
      value: Gender.Male,
    },
  ];

  return (
    <Container childrenContainerClassNames="sm:pt-10 pt-4 pb-2 w-full flex flex-col gap-y-4 md:gap-y-10">
      <div className="flex flex-col gap-y-4">
        <CheckboxInput
          label="Sort by"
          options={sortOptions}
          onChange={(e) => {
            const value = e.target.value;

            if (!selectedSortOptions.includes(value)) {
              setSelectedSortOptions((prev) => [...prev, value]);
            } else {
              setSelectedSortOptions(selectedSortOptions.filter((x) => x !== value));
            }
          }}
        />
        {selectedSortOptions.includes("countryAndCity") && (
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Country"
              options={countriesOptions}
              onChange={(e) => {
                setSelectedCountry(e);
              }}
              initialOptionLabel="Select country"
              value={selectedCountry}
            />
            {selectedCountry && (
              <AutocompleteSelectInput
                label="City"
                options={citiesOptions}
                onChange={(e) => {
                  setSelectedCity(e);
                }}
                initialOptionLabel="Select city"
                value={selectedCity}
                searchThreshold={2}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          {selectedSortOptions.includes("tripGoals") && (
            <CheckboxInput
              label="Goals"
              options={tripGoalsOptions}
              onChange={(e) => {
                const value = e.target.value as TripGoals;

                if (!selectedGoals.includes(value)) {
                  setSelectedGoals((prev) => [...prev, value]);
                } else {
                  setSelectedGoals(selectedGoals.filter((x) => x !== value));
                }
              }}
            />
          )}
          {selectedSortOptions.includes("tripInterests") && (
            <CheckboxInput
              label="Interests"
              options={tripInterestOptions}
              onChange={(e) => {
                const value = e.target.value as TripInterest;

                if (!selectedInterests.includes(value)) {
                  setSelectedInterests((prev) => [...prev, value]);
                } else {
                  setSelectedInterests(selectedInterests.filter((x) => x !== value));
                }
              }}
            />
          )}
          {selectedSortOptions.includes("gender") && (
            <CheckboxInput
              label="Gender"
              options={genderOptions}
              onChange={(e) => {
                const value = e.target.value as Gender;

                if (!selectedGenders.includes(value)) {
                  setSelectedGenders((prev) => [...prev, value]);
                } else {
                  setSelectedGenders(selectedGenders.filter((x) => x !== value));
                }
              }}
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <ul className="grid grid-cols-[repeat(auto-fit,_max)] sm:grid-cols-[repeat(auto-fit,_16rem)] gap-2 sm:gap-6">
          {renderTripMates}
        </ul>
      </div>

      {showPopup && selectedTripMateId && (
        <TripMatesPopup
          onClose={() => {
            setShowPopup(false);
          }}
          recipientId={selectedTripMateId}
        />
      )}
    </Container>
  );
}
