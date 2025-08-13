import { Form } from "../../components/common/Form";
import { ValidRegistration, validRegistrationSchema } from "../../validation/auth.validation";
import { config } from "../../config/config.ts";
import { Title } from "../../components/common/Title.tsx";

export function RegistrationView() {
  const sendRequest = async (data: ValidRegistration) => {
    const response = await fetch(`${config.backendUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    localStorage.setItem("emailToken", JSON.stringify(response.body));
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Registration" />
      <Form<ValidRegistration>
        buttonText="Sign Up"
        fields={{ name: "", surname: "", email: "", password: "" }}
        checkValidation={validRegistrationSchema.parse}
        sendRequest={sendRequest}
      ></Form>
    </div>
  );
}
