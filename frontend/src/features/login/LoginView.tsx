import { useTokenStore } from "../../store/user-store";
import { authAndStoreToken } from "../../utils/auth-and-save-token";
import { ValidLogin, validLoginSchema } from "../../validation/auth.validation";
import { Form } from "../../components/common/Form";
import { Title } from "../../components/common/Title";

export function LoginView() {
  const login = useTokenStore((s) => s.login);

  const submit = async (data: ValidLogin) => {
    const token = await authAndStoreToken(data);

    login(token);
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Login" />
      <Form<ValidLogin>
        buttonText="Sign In"
        fields={{ email: "", password: "" }}
        checkValidation={validLoginSchema.parse}
        sendRequest={submit}
      ></Form>
    </div>
  );
}
