import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { validLoginSchema } from "../../validation/auth.validation";
import { Title } from "../../components/common/Title";
import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { Form } from "../../components/common/form/Form.tsx";

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

  return (
    <Container childrenContainerClassNames="flex items-center justify-center gap-x-20 h-full">
      <Title classNames="w-1/3">
        Unlock Your <span className="text-accent italic font-bold">Next</span> Adventure
      </Title>

      <div className="flex flex-col gap-y-3">
        <Form
          form={form}
          submitFn={authAndStoreToken}
          submitButtonLabel="LEts Go"
          onSuccess={(token) => {
            login(token);
            setTimeout(() => void navigate(RouterEnum.PlannedTrips), 0);
          }}
        >
          <Input form={form} type="text" label="Email" fieldKey="email" />
          <Input form={form} type="password" label="Password" fieldKey="password" />
        </Form>
      </div>
    </Container>
  );
}
