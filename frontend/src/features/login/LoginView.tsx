import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { validLoginSchema } from "../../validation/auth.validation";
import { Title } from "../../components/common/Title";
import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";

export function LoginView() {
  const login = useTokenStore((s) => s.login);
  const navigate = useNavigate();
  const form = useForm({
    initialData: {
      email: "",
      password: "",
    },
    validation: validLoginSchema,
    submit: {
      fn: authAndStoreToken,
      onSuccess: (token) => {
        login(token);
        setTimeout(() => void navigate(RouterEnum.PlannedTrips), 0);
      },
    },
  });

  return (
    <Container childrenContainerClassNames="flex items-center justify-center gap-x-20 h-full">
      <Title classNames="w-1/3 hidden sm:block">
        Unlock Your <span className="text-accent italic font-bold">Next</span> Adventure
      </Title>

      <div className="flex flex-col gap-y-5 w-full md:w-auto">
        <Input form={form} type="text" label="Email" fieldKey="email" />
        <Input form={form} type="password" label="Password" fieldKey="password" />
        <form.SubmitError />
        <div className="mx-auto mt-5">
          <form.SubmitButton label="Let's start" size="large" />
        </div>
      </div>
    </Container>
  );
}
