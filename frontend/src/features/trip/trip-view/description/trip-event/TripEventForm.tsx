import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useTripEventApi } from "../../../../../hooks/use-trip-event-api.ts";
import { useUserStore } from "../../../../../store/user-store.ts";
import { Input, useForm } from "../../../../../components/common/form/useForm.tsx";
import { validEventDataSchema } from "../../../../../validation/event.validation.ts";
import { Button } from "../../../../../components/common/Button.tsx";
import { Trip } from "../../../../../types/trip.types.ts";
import { User } from "../../../../../types/user.types.ts";
import { SubTitle } from "../../../../../components/common/SubTitle.tsx";

interface TripEventFormProps {
  trip: Trip;
  user: User;
}

export function TripEventForm(props: TripEventFormProps) {
  const { createEvent } = useTripEventApi();

  const { user } = useUserStore();

  const [editMode, setEditMode] = useState(true);
  const [newDateFrom, setNewDateFrom] = useState();
  const [newDateTo, setNewDateTo] = useState();

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
    <div className="flex flex-col gap-y-2 w-xs">
      <div className="flex items-center">
        <SubTitle content="Planned date" />
        <IconEdit
          stroke={2}
          className="cursor-pointer text-text inline-block ml-2 -mt-2 size-6 md:size-6 hover:text-accent transition print:hidden"
          onClick={() => {
            setEditMode(true);
          }}
        />
      </div>
      <div className="grid grid-cols-[56px_120px] gap-x-6 gap-y-2 items-center">
        <span className="text-accent font-bold text-lg">From</span>
        {editMode ? <Input form={form} type="date" fieldKey="from" /> : <span>{newDateFrom}</span>}
        <span className="text-accent font-bold text-lg">To</span>
        {editMode ? <Input form={form} type="date" fieldKey="to" /> : <span>{newDateTo}</span>}
      </div>
      <ul className="flex flex-col gap-y-2 text-center">{formErrors}</ul>
      <div className="w-1/3 mx-auto">
        {/*<Button*/}
        {/*  label="Select"*/}
        {/*  size="medium"*/}
        {/*  onClick={() => {*/}
        {/*    if (form.isValid) {*/}
        {/*      createEvent.mutate({*/}
        {/*        userId: user.id,*/}
        {/*        tripId: props.trip.id,*/}
        {/*        to: form.data.to.toISOString().split("T")[0],*/}
        {/*        from: form.data.from.toISOString().split("T")[0],*/}
        {/*      });*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  isLoading={createEvent.isPending}*/}
        {/*/>*/}
      </div>
    </div>
  );
}
