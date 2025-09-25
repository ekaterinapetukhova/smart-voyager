import { LatLngBounds } from "leaflet";
import { Container } from "../../components/common/Container.tsx";
import { Map } from "../../components/map/Map.tsx";
import { Form, InputProp } from "../../components/common/form/Form.tsx";
import { ValidAiContentMessage, validAiContentMessage } from "../../validation/ai.validation.ts";
import { config } from "../../config/config.ts";

export function NewTripView() {
  const fields = {
    content: { value: "", type: "text" },
  } satisfies Record<string, InputProp>;

  const sendRequest = async (data: ValidAiContentMessage) => {
    const response = await fetch(`${config.backendUrl}/ai/suggest-trip`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }
  };

  return (
    <Container childrenContainerClassNames="flex-col items-start">
      <Form
        buttonText="Let's create!"
        fields={fields}
        checkValidation={(data) => validAiContentMessage.parse(data)}
        sendRequest={(data) => sendRequest(data)}
        onSuccess={() => {
          //
        }}
      />
      <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
    </Container>
  );
}
