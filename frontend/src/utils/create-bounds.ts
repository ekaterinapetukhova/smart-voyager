import { GeoJSON } from "geojson";
import bbox from "@turf/bbox";
import { LatLngBounds } from "leaflet";

export const createBounds = (geojson: GeoJSON) => {
  const [minX, minY, maxX, maxY] = bbox(geojson);

  return new LatLngBounds([minY, minX], [maxY, maxX]);
};
