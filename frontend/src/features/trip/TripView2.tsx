import { useParams } from "react-router-dom";
import { useState } from "react";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { Container } from "../../components/common/Container.tsx";
import { Title } from "../../components/common/Title.tsx";
import { useTripApi, useTripById } from "../../hooks/use-trip-api.ts";
import { Map } from "../../components/map/Map.tsx";
import { useTripPointAPI } from "../../hooks/use-trip-point-api.ts";
import { TextInput } from "../../components/common/TextInput.tsx";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { validEventDataSchema } from "../../validation/event.validation.ts";
import { Button } from "../../components/common/Button.tsx";
import { useTripEventApi } from "../../hooks/use-trip-event-api.ts";
import { useUserStore } from "../../store/user-store.ts";
import { TripEvent } from "../trip-event/TripEvent.tsx";
import { PlacesList } from "./PlacesList.tsx";

interface EventFormProps {
  tripId: string;
}

function EventForm(props: EventFormProps) {
  const { createEvent } = useTripEventApi();

  const { user } = useUserStore();

  const form = useForm({
    initialData: {
      from: new Date(),
      to: new Date(),
    },
    validation: validEventDataSchema,
  });

  if (!user) {
    return;
  }

  const formErrors = form.formErrors.map((error) => {
    return <li className="text-error text-xs">{error}</li>;
  });

  return (
    <div className="flex flex-col gap-y-4 w-xs">
      <div className="flex gap-x-12">
        <Input form={form} type="date" fieldKey="from" label="Start ;)" />
        <Input form={form} type="date" fieldKey="to" label="End ;(" />
      </div>
      <ul className="flex flex-col gap-y-2 text-center">{formErrors}</ul>
      <Button
        label="Select"
        size="large"
        onClick={() => {
          if (form.isValid) {
            createEvent.mutate({
              userId: user.id,
              tripId: props.tripId,
              to: form.data.to.toISOString().split("T")[0],
              from: form.data.from.toISOString().split("T")[0],
            });
          }
        }}
        isLoading={createEvent.isPending}
      />
    </div>
  );
}

export function TripView2() {
  const { addTripPoint, deleteTripPoint } = useTripPointAPI();
  const { updateTrip } = useTripApi();

  const params = useParams();

  const [clickTripId, setClickTripId] = useState<string | null>();
  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  return (
    <Container childrenContainerClassNames="flex-col gap-y-10 h-svh min-h-svh relative">
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
              void updateTrip.mutateAsync({ name: newTitle, id: trip.id }).then(() => {
                setEditTitleMode(false);
              });
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

      <p className="text-text absolute top-4 right-4 p-4 h-12 z-10 bg-background/60 ">{trip.description}</p>
      {!trip.event && <EventForm tripId={trip.id} />}
      {trip.event && <TripEvent from={trip.event.from} to={trip.event.to} />}
      <div className="absolute left-12 bottom-12 top-12 w-sm bg-background/60 z-10 flex flex-col p-4">
        <PlacesList
          places={trip.tripPoints}
          onClick={(id) => {
            setClickTripId(id);
          }}
        />
      </div>
      <Map
        points={trip.tripPoints}
        onRemovePoint={(id) => void deleteTripPoint(id)}
        onAddPoint={(point) => void addTripPoint({ ...point, tripId })}
        activePoint={clickTripId ?? null}
        classNames="absolute inset-0 -z-10"
      />
    </Container>
  );
}
