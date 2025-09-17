import { useNavigate } from "react-router-dom";
import { Form, FormValues, InputProp } from "../../components/common/form/Form.tsx";
import { ValidRegistration, validRegistrationSchema } from "../../validation/auth.validation";
import { config } from "../../config/config.ts";
import { Title } from "../../components/common/Title.tsx";
import { Gender } from "../../types/user.types.ts";
import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";

export function RegistrationView() {
  const navigate = useNavigate();

  const fields = {
    name: { value: "", type: "text" },
    email: { value: "", type: "text" },
    birthDate: { value: new Date().toISOString(), type: "date", label: "Date of birth" },
    gender: {
      value: Gender.Male,
      options: [Gender.Male, Gender.Female],
      type: "radio",
    },
    password: { value: "", type: "password" },
    avatar: { value: undefined, type: "file" },
  } satisfies Record<string, InputProp>;

  const bufferToBase64 = (buffer: ArrayBuffer) => {
    const uintArray = new Uint8Array(buffer);
    const str = uintArray.reduce((acc, byte) => acc + String.fromCharCode(byte), "");

    return btoa(str);
  };

  const prepareCreatedData = (data: FormValues<typeof fields>) => {
    return { ...data, avatar: bufferToBase64(data.avatar as unknown as ArrayBuffer) };
  };

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
    <Container childrenContainerClassNames="justify-center gap-x-20">
      <Title>
        From Dreaming to Traveling – <span className="text-accent italic block font-bold">Start Now</span>
      </Title>
      <Form
        buttonText="Let's start!"
        fields={fields}
        checkValidation={(data) => validRegistrationSchema.parse(prepareCreatedData(data))}
        sendRequest={(data) => sendRequest(prepareCreatedData(data))}
        onSuccess={() => {
          void navigate(RouterEnum.Auth);
        }}
      />
    </Container>
  );
}
