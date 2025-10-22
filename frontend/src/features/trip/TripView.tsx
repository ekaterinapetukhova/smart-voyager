import { useParams } from "react-router-dom";
import { useState } from "react";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { Container } from "../../components/common/Container.tsx";
import { Title } from "../../components/common/Title.tsx";
import { useTripById } from "../../hooks/use-trip-api.ts";
import { Map } from "../../components/map/Map.tsx";
import { useTripPointAPI } from "../../hooks/use-trip-point-api.ts";
import { TextInput } from "../../components/common/TextInput.tsx";
import { PlacesList } from "./PlacesList.tsx";

export function TripView() {
  const tripPointApi = useTripPointAPI();
  const params = useParams();
  const [clickTripId, setClickTripId] = useState<string | null>();

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  // const saveNewTitle = async () => {
  //   await tripPointApi.updateTripPoint();
  // };

  return (
    <Container childrenContainerClassNames="flex-col gap-y-10">
      {editTitleMode ? (
        <>
          <TextInput
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <IconDeviceFloppy
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 size-10 -mt-1 hover:text-accent transition"
            onClick={() => {
              // props.onSaveName(pointName);
              setEditTitleMode(false);
            }}
          />
        </>
      ) : (
        <Title>
          {trip.name}
          <IconEdit
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 -mt-2 size-10 hover:text-accent transition"
            onClick={() => {
              setEditTitleMode(true);
            }}
          />
        </Title>
      )}

      <p className="text-text">{trip.description}</p>
      <div className="size-full grid grid-cols-3 gap-x-10">
        <PlacesList
          places={trip.waypoints}
          onClick={(id) => {
            setClickTripId(id);
          }}
        />
        <Map
          points={trip.waypoints}
          onRemovePoint={(id) => void tripPointApi.deleteTripPoint(id)}
          onAddPoint={(point) => void tripPointApi.addTripPoint({ ...point, tripId })}
          activePoint={clickTripId ?? null}
          classNames="col-span-2 h-[800px]"
        />
      </div>
    </Container>
  );
}
