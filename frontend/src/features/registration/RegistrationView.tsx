import { useState } from "react";
import { ValidRegistration, validRegistrationSchema } from "../../validation/auth.validation";
import { config } from "../../config/config.ts";
import { Title } from "../../components/common/Title.tsx";
import { Gender } from "../../types/user.types.ts";
import { Container } from "../../components/common/Container.tsx";
import { Input, useForm } from "../../components/common/form/useForm.tsx";

export function RegistrationView() {
  const [showEmailInfo, setShowEmailInfo] = useState<boolean | null>(null);
  const [showErrorInfo, setShowErrorInfo] = useState<boolean>(false);

  const bufferToBase64 = (buffer: ArrayBuffer) => {
    const uintArray = new Uint8Array(buffer);
    const str = uintArray.reduce((acc, byte) => acc + String.fromCharCode(byte), "");

    return btoa(str);
  };

  const sendRequest = async () => {
    const data: ValidRegistration = {
      ...form.data,
      birthDate: form.data.birthDate.toISOString(),
      avatar: bufferToBase64(await form.data.avatar[0].arrayBuffer()),
    };

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

  const form = useForm({
    initialData: {
      name: "",
      email: "",
      birthDate: new Date(),
      gender: Gender.Male,
      password: "",
      avatar: [] as File[],
    },
    validation: validRegistrationSchema,
    submit: {
      fn: sendRequest,
      onSuccess: () => {
        setShowEmailInfo(true);
      },
      onError: () => {
        setShowErrorInfo(true);
      },
    },
  });

  return (
    <Container childrenContainerClassNames="flex flex-col md:flex-row items-center justify-center gap-x-20 h-full">
      <Title classNames="w-1/3 hidden lg:block">
        From Dreaming to Traveling – <span className="text-accent italic block font-bold">Start Now</span>
      </Title>
      <div className="w-full lg:w-1/4 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <Input form={form} type="text" label="Name" fieldKey="name" />
          <Input form={form} type="text" label="Email" fieldKey="email" />
          <Input form={form} type="date" label="Birth date" fieldKey="birthDate" />
          <Input form={form} type="radio" label="Gender" fieldKey="gender" options={[Gender.Male, Gender.Female]} />
          <Input form={form} type="password" label="Password" fieldKey="password" />
          <Input form={form} type="file" label="Avatar" fieldKey="avatar" />

          {!showEmailInfo && (
            <div className="w-fit mx-auto mt-5">
              <form.SubmitButton label="Let's start" size="large" />
            </div>
          )}
        </div>
        {showEmailInfo && (
          <span className="text-accent text-xs block text-center">
            We’ve sent a confirmation link to your email. Please check your inbox and click the link to activate your
            account
          </span>
        )}
        {showErrorInfo && !showEmailInfo && (
          <span className="text-accent text-xs block text-center">
            Sorry, but there are some technical difficulties
          </span>
        )}
      </div>
    </Container>
  );
}
