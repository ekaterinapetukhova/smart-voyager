import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useTripEventApi } from "../../../../hooks/use-trip-event-api.ts";
import { Input, useForm } from "../../../../components/common/form/useForm.tsx";
import { validEventDataSchema } from "../../../../validation/event.validation.ts";
import { Trip } from "../../../../types/trip.types.ts";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";
import { formatDate } from "../../../../utils/format-date.ts";

interface TripEventFormProps {
  trip: Trip;
}

export function TripEvent(props: TripEventFormProps) {
  const { createEvent } = useTripEventApi();

  const [editMode, setEditMode] = useState(!props.trip.event);

  const form = useForm({
    initialData: {
      from: new Date(),
      to: new Date(),
    },
    validation: validEventDataSchema,
  });

  const formErrors = form.formErrors.map((error) => {
    return <li className="text-error text-xs">{error}</li>;
  });

  const iconsClasses =
      "cursor-pointer text-text inline-block ml-2 size-6 -mt-1 hover:text-accent transition print:hidden",
    datesClasses = "text-text";

  let from = form.data.from.toISOString(),
    to = form.data.to.toISOString();

  if (props.trip.event) {
    from = props.trip.event.from;
    to = props.trip.event.to;
  }

  const formattedDate = formatDate(from, to);

  return (
    <div className="flex flex-col gap-y-2 w-xs">
      <div className="flex items-center">
        <SubTitle content="Planned date" />
        {editMode ? (
          <IconDeviceFloppy
            stroke={2}
            className={iconsClasses}
            onClick={() => {
              if (form.isValid) {
                void createEvent
                  .mutateAsync({
                    from: form.data.from.toISOString(),
                    to: form.data.to.toISOString(),
                    tripId: props.trip.id,
                  })
                  .then(() => {
                    setEditMode(false);
                  });
              }
            }}
          />
        ) : (
          <IconEdit
            stroke={2}
            className={iconsClasses}
            onClick={() => {
              setEditMode(true);
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-[56px_120px] gap-y-2 items-center">
        <span className="text-accent font-bold text-lg">From</span>
        {editMode ? (
          <Input form={form} type="date" fieldKey="from" />
        ) : (
          <span className={datesClasses}>{formattedDate.from}</span>
        )}
        <span className="text-accent font-bold text-lg">To</span>
        {editMode ? (
          <Input form={form} type="date" fieldKey="to" />
        ) : (
          <span className={datesClasses}>{formattedDate.to}</span>
        )}
      </div>
      <ul className="flex flex-col gap-y-2">{formErrors}</ul>
    </div>
  );
}
