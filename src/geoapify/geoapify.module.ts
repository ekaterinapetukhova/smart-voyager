import { Module } from "@nestjs/common";
import { GeoapifyPlacesApiClient } from "./service/geoapify-places-api-client";
import { GeoapifyApiClient } from "./service/geoapify-api-client";
import { GeoapifyRoutesApiClient } from "./service/geoapify-routes-api-client";

@Module({
  controllers: [],
  providers: [GeoapifyPlacesApiClient, GeoapifyApiClient, GeoapifyRoutesApiClient],
  exports: [GeoapifyRoutesApiClient],
})
export class GeoapifyModule {}
