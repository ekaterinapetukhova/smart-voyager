import { useNavigate } from "react-router-dom";
import { Form, InputProp } from "../../../components/common/form/Form.tsx";
import { ValidAiContentMessage, validAiContentMessage } from "../../../validation/ai.validation.ts";
import { Container } from "../../../components/common/Container.tsx";
import { authorizedFetch } from "../../../utils/authorized-fetch.ts";

export function NewTripByAIView() {
  const navigate = useNavigate();

  const fields = {
    content: { value: "", type: "text" },
  } satisfies Record<string, InputProp>;

  const sendRequest = async (data: ValidAiContentMessage) => {
    const request = authorizedFetch();

    const response: {
      tripId: string;
    } = await request({ method: "POST", path: "ai/suggest-trip", data });

    void navigate(`/trip/${response.tripId}`);
  };

  return (
    <Container>
      {/* add textarea */}
      <Form
        buttonText="Let's create!"
        fields={fields}
        checkValidation={(data) => validAiContentMessage.parse(data)}
        sendRequest={(data) => sendRequest(data)}
        hiddenLabel
        formClassNames="items-center w-full"
      />
      {/*<Map />*/}
    </Container>
  );
}
