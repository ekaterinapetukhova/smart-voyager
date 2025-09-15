import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config.ts";
import { RouterEnum } from "../types/router.types.ts";
import { updateUserStore } from "../store/user-store.ts";

export const useVerification = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (emailToken: string | null) => {
      await fetch(`${config.backendUrl}/auth/verify-email`, {
        method: "POST",
        body: JSON.stringify({
          emailToken,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
    },
    onSuccess: () => {
      void updateUserStore();
      void navigate(RouterEnum.Auth);
    },
  });
};
