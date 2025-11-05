import { config } from "../config/config";
import { UnauthorizedError } from "../errors/unathorizaed-error.ts";
import { ValidLogin } from "../validation/auth.validation.ts";

interface LoginResponse {
  token: string;
}

interface LoginError {
  errorMessage: string;
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
    const err: LoginError = await response.json();
    throw new UnauthorizedError(err.errorMessage);
  }

  const body: LoginResponse = await response.json();

  return body.token;
};
