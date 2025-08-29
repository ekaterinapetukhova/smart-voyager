import { Form } from "../../components/common/Form";
import { ValidRegistration, validRegistrationSchema } from "../../validation/auth.validation";
import { config } from "../../config/config.ts";
import { Title } from "../../components/common/Title.tsx";
import { Gender } from "../../types/user.types.ts";

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
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Registration" />
      <Form
        buttonText="Sign Up"
        fields={{
          name: { value: "", type: "text" },
          surname: { value: "", type: "text" },
          email: { value: "", type: "text" },
          birthDate: { value: "", type: "date" },
          gender: {
            value: Gender.Male,
            options: [Gender.Male, Gender.Female],
            type: "radio",
          },
          password: { value: "", type: "password" },
        }}
        checkValidation={validRegistrationSchema.parse}
        sendRequest={(data) =>
          sendRequest({
            ...data,
            birthDate: new Date(data.birthDate),
          })
        }
      ></Form>
    </div>
  );
}
