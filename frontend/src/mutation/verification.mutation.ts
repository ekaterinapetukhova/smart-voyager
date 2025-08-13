import { config } from "../config/config.ts";

export const verifyUserEmail = async (emailToken: string) => {
  await fetch(`${config.backendUrl}/auth/verify-email`, {
    method: "POST",
    body: JSON.stringify({
      emailToken,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
};
