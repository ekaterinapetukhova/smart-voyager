import { GeoJSON } from "geojson";
import bbox from "@turf/bbox";
import { LatLngBounds } from "leaflet";

export const createBounds = (geojson: GeoJSON) => {
  const [minX, minY, maxX, maxY] = bbox(geojson);

  return new LatLngBounds([minY, minX], [maxY, maxX]);
};

export const createBoundsFromPoints = (points: number[][]) => {
  let [minX, minY, maxX, maxY] = [1000, 1000, -1000, -1000];

  for (const point of points) {
    minX = Math.min(minX, point[0]);
    minY = Math.min(minY, point[1]);
    maxX = Math.max(maxX, point[0]);
    maxY = Math.max(maxY, point[1]);
  }

  const xDiff = maxX - minX;
  const yDiff = maxY - minY;
  const paddingMultiplier = 0.1;

  return new LatLngBounds(
    [minX - xDiff * paddingMultiplier, minY - yDiff * paddingMultiplier],
    [maxX + xDiff * paddingMultiplier, maxY + yDiff * paddingMultiplier]
  );
};
