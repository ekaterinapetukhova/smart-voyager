import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/common/Container.tsx";
import { Input, useForm } from "../../../components/common/form/useForm.tsx";
import { ButtonLink } from "../../../components/common/ButtonLink.tsx";
import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { Title } from "../../../components/common/Title.tsx";
import { createTripSchema } from "../../../validation/trip.validation.ts";

export function NewTripByUserView() {
  const { addTrip } = useTripApi();

  const navigate = useNavigate();

  const form = useForm({
    initialData: {
      name: "",
      description: "",
    },
    validation: createTripSchema,
  });

  return (
    <Container childrenContainerClassNames="flex-col items-start gap-y-10">
      <Title>Imagine your next trip</Title>
      <div className="flex flex-col gap-y-3">
        <Input form={form} fieldKey="name" type="text" label="Trip name" />
        <Input form={form} fieldKey="description" type="text" label="Trip description" />
        <div className="w-fit mx-auto mt-10">
          <ButtonLink
            size="large"
            label="Let's create"
            componentVariants={{
              button: {
                selected: true,
                isLoading: addTrip.isPending,
                type: "submit",
                onClick: async () => {
                  if (form.isValid) {
                    const trip = await addTrip.mutateAsync(form.data);

                    void navigate(`/trip/${trip.id}`);
                  }
                },
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
}
