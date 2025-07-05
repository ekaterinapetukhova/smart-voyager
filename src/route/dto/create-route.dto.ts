import z from "zod";
import { createRoutePointDtoSchema } from "../../route-point/dto/create-route-point.dto";
import { RouteMode, RouteType } from "../route.types";

export const createRouteDtoSchema = z.object({
  name: z.string().min(1),
  routePoints: z.array(createRoutePointDtoSchema),
  mode: z.nativeEnum(RouteMode),
  type: z.nativeEnum(RouteType),
});

export type CreateRouteDto = z.output<typeof createRouteDtoSchema>;
