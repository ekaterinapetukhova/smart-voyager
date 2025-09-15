import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { ValidLogin, validLoginSchema } from "../../validation/auth.validation";
import { Form } from "../../components/common/Form";
import { Title } from "../../components/common/Title";
import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";

export function LoginView() {
  const login = useTokenStore((s) => s.login);

  const navigate = useNavigate();

  const submit = async (data: ValidLogin) => {
    const token = await authAndStoreToken(data);

    login(token);
  };

  return (
    <Container childrenContainerClassNames="justify-center gap-x-20">
      <Title>
        Unlock Your <span className="text-accent italic font-bold">Next</span> Adventure
      </Title>
      <Form
        buttonText="Log in"
        fields={{
          email: { value: "", type: "text" },
          password: { value: "", type: "password" },
        }}
        checkValidation={validLoginSchema.parse}
        sendRequest={submit}
        onSuccess={() => {
          void navigate(RouterEnum.Trips);
        }}
      ></Form>
    </Container>
  );
}
