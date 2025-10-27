import { useTokenStore } from "../store/user-store.ts";
import { config } from "../config/config.ts";

export const authorizedFetch = () => {
  const headers = { Authorization: `Bearer ${useTokenStore.getState().token}` };

  return async (params: { method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"; path: string; data?: object }) => {
    const response = await fetch(`${config.backendUrl}/${params.path}`, {
      method: params.method,
      body: params.data ? JSON.stringify(params.data) : undefined,
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    });

    console.log(response);

    if (!response.ok) {
      console.error(response, await response.text());

      throw new Error(`${params.method} failed`);
    }

    return response.headers.get("content-type")?.startsWith("application/json") ? response.json() : response.text();
  };
};
