import { Module } from "@nestjs/common";
import { GeoapifyPlacesApiClient } from "./service/geoapify-places-api-client";
import { GeoapifyApiClient } from "./service/geoapify-api-client";
import { GeoapifyRoutesApiClient } from "./service/geoapify-routes-api-client";
import { GeoapifyForwardGeocodeService } from "./service/geoapify-forward-geocode.service";
import { GeoapifyAutocompleteService } from "./service/geoapify-autocomplete.service";

@Module({
  controllers: [],
  providers: [
    GeoapifyPlacesApiClient,
    GeoapifyApiClient,
    GeoapifyRoutesApiClient,
    GeoapifyForwardGeocodeService,
    GeoapifyAutocompleteService,
  ],
  exports: [GeoapifyRoutesApiClient, GeoapifyForwardGeocodeService, GeoapifyAutocompleteService],
})
export class GeoapifyModule {}
