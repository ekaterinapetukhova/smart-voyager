import { useState } from "react";
import { LatLngBounds } from "leaflet";
import { GeoJSON } from "geojson";
import bbox from "@turf/bbox";
import { Container } from "../../components/common/Container.tsx";
import { SearchInput } from "../../components/common/SearchInput.tsx";
import { useTripByUser } from "../../hooks/use-trip.ts";
import { LinkTo } from "../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Map } from "../../components/map/Map.tsx";

export const TripView = () => {
  const [searchedTrip, setSearchedTrip] = useState("");

  const { data: trips } = useTripByUser();

  const tripItems = trips?.map((trip) => {
    const geojson = (typeof trip.geojson === "string" ? JSON.parse(trip.geojson) : trip.geojson) as GeoJSON;

    const [minX, minY, maxX, maxY] = bbox(geojson);
    const bounds = new LatLngBounds([minY, minX], [maxY, maxX]);
    // const points = point(geojson.bbox!, 1);

    return (
      <li className="w-full py-5 px-3 flex h-full text-accent relative" key={trip.name}>
        <div className="size-full absolute opacity-20 bg-button-primary-hover top-0 left-0 -z-10"></div>
        <h3>{trip.name}</h3>
        <Map miniature geojson={geojson} initialBounds={bounds} />
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
          <LinkTo label="Create new trip" type="button" url={RouterEnum.NewTrip} />
        </div>
      </div>

      {trips && <ul className="w-full">{tripItems}</ul>}
    </Container>
  );
};
