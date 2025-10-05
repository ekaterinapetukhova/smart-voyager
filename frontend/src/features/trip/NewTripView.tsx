import { LatLngBounds } from "leaflet";
import { Container } from "../../components/common/Container.tsx";
import { Map } from "../../components/map/Map.tsx";
import { Form, InputProp } from "../../components/common/form/Form.tsx";
import { ValidAiContentMessage, validAiContentMessage } from "../../validation/ai.validation.ts";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";

export function NewTripView() {
  const fields = {
    content: { value: "", type: "text" },
  } satisfies Record<string, InputProp>;

  const sendRequest = async (data: ValidAiContentMessage) => {
    const { post } = authorizedFetch();

    const response = await post("ai/suggest-trip", data);

    console.log("response", await response.json());
  };

  return (
    <Container childrenContainerClassNames="flex-col items-start">
      <Form
        buttonText="Let's create!"
        fields={fields}
        checkValidation={(data) => validAiContentMessage.parse(data)}
        sendRequest={(data) => sendRequest(data)}
        onSuccess={() => {
          console.log();
        }}
        hiddenLabel
        formClassNames="flex-row items-center w-full"
      />
      <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
    </Container>
  );
}
