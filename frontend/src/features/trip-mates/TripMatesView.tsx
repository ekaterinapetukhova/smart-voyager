import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { useTripMates } from "../../hooks/use-trip-mates.ts";
import { Title } from "../../components/common/Title.tsx";
import { SelectInput } from "../../components/common/SelectInput.tsx";
import { useCountriesAndCities } from "../../hooks/use-countries-and-cities.ts";
import { TripMateCard } from "./TripMateCard.tsx";
import { TripMatesPopup } from "./TripMatesPopup.tsx";

export function TripMatesView() {
  const { data: tripMates } = useTripMates();

  const { data: countriesAndCities } = useCountriesAndCities();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTripMateId, setSelectedTripMateId] = useState("");

  const tripMatesList = tripMates?.map((tripMate) => {
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

  return (
    <Container childrenContainerClassNames="py-10 w-full flex flex-col gap-y-10 pt-10">
      <Title>Find Trip Mates</Title>
      <SelectInput label="Filter by countries" />
      <div className="w-full">
        <ul className="grid grid-cols-[repeat(auto-fit,_16rem)] gap-6">{tripMatesList}</ul>
      </div>

      {showPopup && selectedTripMateId && (
        <TripMatesPopup
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </Container>
  );
}
