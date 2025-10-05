import { Module } from "@nestjs/common";
import { GeoapifyPlacesApiClient } from "./service/geoapify-places-api-client";
import { GeoapifyApiClient } from "./service/geoapify-api-client";
import { GeoapifyRoutesApiClient } from "./service/geoapify-routes-api-client";
import { GeoapifyForwardGeocodeService } from "./service/geoapify-forward-geocode.service";

@Module({
  controllers: [],
  providers: [GeoapifyPlacesApiClient, GeoapifyApiClient, GeoapifyRoutesApiClient, GeoapifyForwardGeocodeService],
  exports: [GeoapifyRoutesApiClient, GeoapifyForwardGeocodeService],
})
export class GeoapifyModule {}
