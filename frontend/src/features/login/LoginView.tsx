import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { validLoginSchema } from "../../validation/auth.validation";
import { Title } from "../../components/common/Title";
import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

export function LoginView() {
  const login = useTokenStore((s) => s.login);

  const navigate = useNavigate();

  const form = useForm({
    initialData: {
      email: "",
      password: "",
    },
    validation: validLoginSchema,
  });

  const sendRequest = useMutation({
    mutationFn: authAndStoreToken,
    onSuccess: (token) => {
      login(token);

      void navigate(RouterEnum.Trips);
    },
  });

  return (
    <Container childrenContainerClassNames="justify-center gap-x-20 h-full">
      <Title classNames="w-1/3">
        Unlock Your <span className="text-accent italic font-bold">Next</span> Adventure
      </Title>
      <div className="flex flex-col gap-y-3">
        <Input form={form} type="text" label="Email" fieldKey="email" />
        <Input form={form} type="password" label="Password" fieldKey="password" />
        <div className="w-fit mx-auto mt-10">
          <ButtonLink
            size="large"
            label="Let's start"
            componentVariants={{
              button: {
                selected: true,
                isLoading: sendRequest.isPending,
                type: "submit",
                onClick: () => {
                  if (form.isValid) {
                    sendRequest.mutate(form.data);
                  }
                },
              },
            }}
          />
        </div>
      </div>
    </Container>
  );
}
