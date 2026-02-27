import { useNavigate } from "react-router-dom";
import { Container } from "../../../components/common/Container.tsx";
import { Input, useForm } from "../../../components/common/form/useForm.tsx";
import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { Title } from "../../../components/common/Title.tsx";
import { createTripSchema } from "../../../validation/trip.validation.ts";

// Komponent widoku umożliwiający użytkownikowi tworzenie nowej własnej trasy

export function NewTripByUserView() {
  // Własny hook odpowiedzialny za komunikację z API w zakresie tworzenia tras
  // Wysyła dane do backendu, zapisuje trasę w bazie danych oraz aktualizuje cache po poprawnym zakończeniu operacji

  const { createTrip } = useTripApi();

  // Hook do nawigacji pomiędzy widokami aplikacji

  const navigate = useNavigate();

  // Własny hook do obsługi formularza

  const form = useForm({
    // Dane początkowe formularza

    initialData: {
      name: "",
      description: "",
    },

    // Schemat walidacji danych

    validation: createTripSchema,

    // Konfiguracja wysyłania formularza

    submit: {
      fn: async (data) => {
        return await createTrip.mutateAsync(data);
      },
      onSuccess: (trip) => {
        void navigate(`/trip/${trip.id}`);
      },
    },
  });

  return (
    // Własny komponent kontenera odpowiedzialny za układ widoku

    <Container childrenContainerClassNames="flex flex-col items-center pt-10 h-full">
      {/* Własny komponent nadgłówka */}

      <Title>Imagine your next trip</Title>

      <div className="flex flex-col gap-y-5 m-auto h-full w-1/2 justify-center">
        {/* Własny komponent pola formularza do wprowadzenia danych trasy */}

        <Input form={form} fieldKey="name" type="text" label="Trip name" />
        <Input form={form} fieldKey="description" type="textarea" label="Trip description" />

        {/* Własny komponent do wyświetlenia blędow formularza */}

        <form.SubmitError />
        <div className="w-fit mx-auto">
          {/* Własny komponent przyciska do wysyłania formularza */}

          <form.SubmitButton label="Let's create" size="large" type="button" />
        </div>
        <form.SubmitError />
      </div>
    </Container>
  );
}
