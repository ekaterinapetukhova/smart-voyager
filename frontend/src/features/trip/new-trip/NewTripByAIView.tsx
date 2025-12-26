import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/common/Container.tsx";
import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { Input, useForm } from "../../../components/common/form/useForm.tsx";
import { Title } from "../../../components/common/Title.tsx";
import { ButtonLink } from "../../../components/common/ButtonLink.tsx";
import { createTripByAISchema } from "../../../validation/trip.validation.ts";

export function NewTripByAIView() {
  const navigate = useNavigate();

  const createMutation = useTripApi().useCreateByAI((tripId) => {
    void navigate(`/trip/${tripId}`);
  });

  const form = useForm({
    initialData: {
      content: "",
    },
    validation: createTripByAISchema,
  });

  return (
    <Container childrenContainerClassNames="flex flex-col items-center pt-10 h-full">
      <Title>Describe your trip wishes</Title>
      <div className="h-full flex flex-col gap-y-5 w-full sm:w-3/4 xl:w-1/2 justify-center">
        <Input type="textarea" form={form} fieldKey="content" label="Trip description" />
        <div className="w-1/3 mx-auto">
          <ButtonLink
            label="Create"
            size="large"
            componentVariants={{
              button: {
                selected: true,
                onClick: () => {
                  if (form.isValid) {
                    createMutation.mutate(form.data);
                  }
                },
                isLoading: createMutation.isPending,
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
}
