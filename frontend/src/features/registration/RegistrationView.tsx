import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/Form";
import { ValidRegistration, validRegistrationSchema } from "../../validation/auth.validation";
import { config } from "../../config/config.ts";
import { Title } from "../../components/common/Title.tsx";
import { Gender } from "../../types/user.types.ts";
import { Container } from "../../components/common/Container.tsx";

export function RegistrationView() {
  const navigate = useNavigate();

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
    <Container childrenContainerClassNames="justify-center gap-x-20" withBg={true}>
      <Title>
        From Dreaming to Traveling – <span className="text-accent italic block font-bold">Start Now</span>
      </Title>
      <Form
        buttonText="Let's start!"
        fields={{
          name: { value: "", type: "text" },
          email: { value: "", type: "text" },
          birthDate: { value: new Date().toISOString(), type: "date", label: "Date of birth" },
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
        onSuccess={() => {
          void navigate("/");
        }}
      ></Form>
    </Container>
  );
}
