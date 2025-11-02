import { config } from "../config/config";
import { UnauthorizedError } from "../errors/unathorizaed-error.ts";
import { ValidLogin } from "../validation/auth.validation.ts";

interface LoginResponse {
  token: string;
}

export const authAndStoreToken = async (data: ValidLogin) => {
  const response = await fetch(`${config.backendUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 400) {
      throw new UnauthorizedError("Email or password is not correct");
    }
  }

  const body = (await response.json()) as LoginResponse;

  return body.token;
};
