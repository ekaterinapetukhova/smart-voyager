import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config.ts";
import { RouterEnum } from "../types/router.types.ts";
import { useTokenStore } from "../store/user-store.ts";

interface VerificationResponse {
  token: string;
}

export const useVerification = () => {
  const navigate = useNavigate();
  const login = useTokenStore((s) => s.login);

  return useMutation({
    mutationFn: async (emailToken: string | null) => {
      const response = await fetch(`${config.backendUrl}/auth/verify-email`, {
        method: "POST",
        body: JSON.stringify({
          emailToken,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Verification by email failed");
      }

      const body: VerificationResponse = await response.json();

      return body.token;
    },
    onSuccess: (token) => {
      login(token);
      setTimeout(() => void navigate(RouterEnum.PlannedTrips), 0);
    },
  });
};
