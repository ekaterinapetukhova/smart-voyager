import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useTripEventApi } from "../../../hooks/use-trip-event-api.ts";
import { useUserStore } from "../../../store/user-store.ts";
import { Input, useForm } from "../../../components/common/form/useForm.tsx";
import { validEventDataSchema } from "../../../validation/event.validation.ts";
import { Button } from "../../../components/common/Button.tsx";
import { TextInput } from "../../../components/common/TextInput.tsx";
import { Title } from "../../../components/common/Title.tsx";
import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { Trip } from "../../../types/trip.types.ts";
import { TripEvent } from "../../trip-event/TripEvent.tsx";

interface TripDescriptionProps {
  trip: Trip;
}

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

export function TripDescription(props: TripDescriptionProps) {
  const { updateTrip } = useTripApi();

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const scrollToMap = () => {
    const tripMap = document.getElementById("tripMap");

    tripMap?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id="tripDescription" className="h-screen pt-10 flex flex-col items-center">
      <div className="grow">
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
                void updateTrip.mutateAsync({ name: newTitle, id: props.trip.id }).then(() => {
                  setEditTitleMode(false);
                });
              }}
            />
          </>
        ) : (
          <Title>
            {props.trip.name}
            <IconEdit
              stroke={2}
              className="cursor-pointer text-text inline-block ml-2 -mt-2 size-10 hover:text-accent transition"
              onClick={() => {
                setEditTitleMode(true);
              }}
            />
          </Title>
        )}
        <p className="text-text">{props.trip.description}</p>
        {!props.trip.event && <EventForm tripId={props.trip.id} />}
        {props.trip.event && <TripEvent from={props.trip.event.from} to={props.trip.event.to} />}
      </div>
      <div className="w-24">
        <Button label="Scroll to map" size="small" onClick={scrollToMap} />
      </div>
    </div>
  );
}
