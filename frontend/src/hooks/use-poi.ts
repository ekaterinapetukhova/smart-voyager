import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { config } from "../config/config.ts";
import { RouteCategories } from "../types/route.types.ts";

// export interface Filter {
//   key: string;
//   label: string;
//   query: string;
// }
//
// export interface OverpassElement {
//   type: string;
//   id: number;
//   lat?: number;
//   lon?: number;
//   tags?: Record<string, string>;
// }
//
interface GeoapifyFeature {
  type: string;
  properties: object;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface GeoapifyResponse {
  type: string;
  features: GeoapifyFeature[];
}

export const usePOIs = (
  category: RouteCategories[],
  bbox: string,
  fetchTrigger: boolean,
  setPois: React.Dispatch<React.SetStateAction<GeoapifyFeature[]>>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchRef = useRef(fetchTrigger);

  useEffect(() => {
    if (lastFetchRef.current === fetchTrigger) {
      return;
    }

    lastFetchRef.current = fetchTrigger;

    const fetchPOIs = async () => {
      setLoading(true);
      setError(null);

      try {
        const bboxParts = bbox.split(",").map(Number);

        if (bboxParts.length !== 4 || bboxParts.some(isNaN)) {
          throw new Error("Invalid bbox format");
        }

        const url = `${config.geoapifyPlacesApiUrl}?apiKey=${config.geoapifyKey}&categories=${category}&filter=rect:${bbox}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Geoapify request failed");
        }

        const data: GeoapifyResponse = await response.json();

        setPois(data.features);
      } catch (e) {
        console.error("Error fetching POIs:", e);
        setError("Failed to load POIs");
      } finally {
        setLoading(false);
      }
    };

    void fetchPOIs();
  }, [category, bbox, fetchTrigger, setPois]);

  return { loading, error };
};
