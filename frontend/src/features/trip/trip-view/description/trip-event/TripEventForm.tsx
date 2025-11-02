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
      <SubTitle content="Choose trip termin" />
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
              tripId: props.trip.id,
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
