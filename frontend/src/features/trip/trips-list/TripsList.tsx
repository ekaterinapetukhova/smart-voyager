import { useState } from "react";
import { Link } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";
import { IconArrowRight } from "@tabler/icons-react";
import { Avatar } from "../../../components/common/Avatar.tsx";
import { Container } from "../../../components/common/Container.tsx";
import { SearchInput } from "../../../components/common/SearchInput.tsx";
import { ButtonLink } from "../../../components/common/ButtonLink.tsx";
import { RouterEnum } from "../../../types/router.types.ts";
import { Trip } from "../../../types/trip.types.ts";
import { formatDate, FormattedDate } from "../../../utils/format-date.ts";
import { Logo } from "../../../components/logo/Logo.tsx";

interface TripListProps {
  trips: UseQueryResult<Trip[]>;
}

export function TripsList(props: TripListProps) {
  const [searchedTrip, setSearchedTrip] = useState("");

  if (!props.trips.isSuccess) {
    return;
  }
  
  const filteredTrips = props.trips.data.filter((x) => x.name.toLowerCase().startsWith(searchedTrip.toLowerCase()));

  const tripItems = filteredTrips.map((trip) => {
    let formattedDate: FormattedDate = { from: "", to: "" };

    if (trip.event) {
      formattedDate = formatDate(trip.event.from, trip.event.to);
    }

    return (
      <li key={trip.id}>
        <Link to={`/trip/${trip.id}`} className="w-full relative flex flex-col gap-y-4 p-0.5 justify-between group">
          <div className="animate-neon-gradient bg-[200%,_200%] absolute inset-0 size-0 group-hover:size-full transition-all -z-10 bg-linear-to-r from-button-primary via-accent to-button-primary-hover"></div>

          <div className="bg-background transition z-20 size-full p-4">
            <div className="flex flex-col">
              <h3 className="text-accent text-md md:text-xl"> {trip.name}</h3>
              <p className="text-text text-xs md:text-base">{trip.description}</p>
            </div>

            {trip.event && (
              <div className="flex items-center justify-between">
                <div className="flex gap-x-4 text-text">
                  <div className="flex gap-x-2">
                    <span className="text-accent">From</span> {formattedDate.from}
                  </div>
                  <IconArrowRight />
                  <div className="flex gap-x-2">
                    <span className="text-accent">To</span> {formattedDate.to}
                  </div>
                </div>

                <div className="flex">
                  <Avatar src={trip.user.avatar} className="size-8 -ml-2 rounded-full overflow-hidden" />

                  {trip.collaborators.map((mate) => {
                    return <Avatar src={mate.avatar} className="size-8 -ml-2 rounded-full overflow-hidden" />;
                  })}
                </div>
              </div>
            )}
          </div>
        </Link>
      </li>
    );
  });

  return (
    <Container childrenContainerClassNames="items-center md:items-start flex flex-col gap-y-2 md:gap-y-10 py-2 md:pt-10">
      <div className="block md:hidden">
        <Logo />
      </div>
      <div className="flex flex-col md:flex-row gap-x-6 lg:gap-x-16 justify-between w-full">
        <SearchInput
          placeholder="Find trip by name..."
          value={searchedTrip}
          onChange={(e) => {
            setSearchedTrip(e.target.value);
          }}
          classNames="hidden md:flex"
        />
        <div className="md:w-1/3 mx-auto">
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
      {props.trips.data.length === 0 ? (
        <p className="hidden md:block text-accent">No trips for now...</p>
      ) : (
        <ul className="w-full flex flex-col gap-y-5">{tripItems}</ul>
      )}
    </Container>
  );
}
