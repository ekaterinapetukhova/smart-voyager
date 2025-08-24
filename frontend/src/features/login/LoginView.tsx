import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { ValidLogin, validLoginSchema } from "../../validation/auth.validation";
import { Form } from "../../components/common/Form";
import { Title } from "../../components/common/Title";
import { Container } from "../../components/common/Container.tsx";

export function LoginView() {
  const login = useTokenStore((s) => s.login);

  const submit = async (data: ValidLogin) => {
    const token = await authAndStoreToken(data);

    login(token);
  };

  return (
    <Container className="flex flex-col items-center">
      <Title title="Login" />
      <Form
        buttonText="Sign In"
        fields={{
          email: { value: "", type: "text" },
          password: { value: "", type: "password" },
        }}
        checkValidation={validLoginSchema.parse}
        sendRequest={submit}
      ></Form>
    </Container>
  );
}
