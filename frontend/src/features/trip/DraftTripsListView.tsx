import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/common/Container.tsx";
import { SearchInput } from "../../components/common/SearchInput.tsx";
import { useTripApi } from "../../hooks/use-trip-api.ts";
import { RouterEnum } from "../../types/router.types.ts";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

export function DraftTripsListView() {
  const [searchedTrip, setSearchedTrip] = useState("");

  const { draftTrips } = useTripApi();

  const tripItems = draftTrips.data?.map((trip) => {
    return (
      <li className="" key={trip.id}>
        <Link to={`/trip/${trip.id}`} className="w-full relative flex flex-col gap-y-4 justify-between px-4 py-5">
          <div className="size-full absolute opacity-20 bg-button-primary-hover top-0 left-0 -z-10"></div>
          <div className="flex flex-col">
            <h3 className="text-accent text-lg"> {trip.name}</h3>
            <p className="text-text">{trip.description}</p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <Container childrenContainerClassNames="items-start flex-col">
      <div className="flex gap-x-16 justify-between w-full pt-10 pb-4">
        <SearchInput
          placeholder="Find trip by name..."
          value={searchedTrip}
          onChange={(e) => {
            setSearchedTrip(e.target.value);
          }}
        />
        <div className="w-1/3">
          <ButtonLink
            size="large"
            label="Create new trip"
            componentVariants={{
              link: {
                selected: true,
                url: RouterEnum.NewTripModeChoice,
              },
            }}
          />
        </div>
      </div>

      {draftTrips.isSuccess && <ul className="w-full flex flex-col gap-y-4">{tripItems}</ul>}
    </Container>
  );
}
