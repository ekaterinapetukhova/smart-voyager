import { useTokenStore } from "../store/user-store.ts";
import { config } from "../config/config.ts";
import { ServerError } from "../errors/server-error.ts";
import { UpdateTripPoint } from "../types/trip-point.types.ts";

export const authorizedFetch = () => {
  const headers = { Authorization: `Bearer ${useTokenStore.getState().token}` };

  const get = async (path: string) => {
    const response = await fetch(`${config.backendUrl}/${path}`, {
      method: "GET",
      headers,
    });

    return response.headers.get("content-type")?.startsWith("application/json") ? response.json() : response.text();
  };

  const post = async (path: string, data: object) => {
    const response = await fetch(`${config.backendUrl}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    });

    return response.headers.get("content-type")?.startsWith("application/json") ? response.json() : response.text();
  };

  const patch = async (path: string, id: string, data: object) => {
    return await fetch(`${config.backendUrl}/${path}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    });
  };

  const put = async (path: string, data: UpdateTripPoint) => {
    const { id, ...rest } = data;

    const response = await fetch(`${config.backendUrl}/${path}/${id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new ServerError("Update of trip point failed");
    }
  };

  const remove = async (path: string, id: string) => {
    const response = await fetch(`${config.backendUrl}/${path}/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
      },
    });

    if (!response.ok) {
      throw new ServerError("Remove of trip point failed");
    }
  };

  return {
    get,
    post,
    patch,
    remove,
    put,
  };
};
