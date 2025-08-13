import { FeatureProperties, GeoapifyRoutesApiClientOutput } from "../types/route.types.ts";

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    properties: FeatureProperties;
    geometry: {
      type: "LineString" | "MultiLineString";
      coordinates: number[][] | number[][][];
    };
  }[];
}

export function toGeoJSON(data: GeoapifyRoutesApiClientOutput): GeoJSONFeatureCollection {
  return {
    type: "FeatureCollection",
    features: data.features.map((feature) => ({
      type: "Feature",
      properties: feature.properties,
      geometry: {
        type: feature.geometry.coordinates.length > 1 ? "MultiLineString" : "LineString",
        coordinates:
          feature.geometry.coordinates.length > 1 ? feature.geometry.coordinates : feature.geometry.coordinates[0],
      },
    })),
  };
}
