import { config } from "../config/config";
import { RouteQueryParams } from "../route/route.types";

export const createGeoapifyUrl = (queryParams: RouteQueryParams): string => {
  const { waypoints, ...otherParams } = queryParams;

  const query = Object.entries(otherParams).join("&").toLowerCase().replaceAll(",", "=");

  return `${config.geoapifyUrl}?waypoints=${waypoints}&${query}&apiKey=${config.geoapifyKey}`;
};
