import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { config } from "../config/config.ts";

export interface Filter {
  key: string;
  label: string;
  query: string;
}

export interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
}

export const usePOIs = (
  selectedFilters: Filter[],
  bbox: string,
  fetchTrigger: boolean,
  setPois: React.Dispatch<React.SetStateAction<OverpassElement[]>>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFetchRef = useRef(fetchTrigger);

  useEffect(() => {
    if (lastFetchRef.current === fetchTrigger || selectedFilters.length === 0) {
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

        const query = `
          [out:json][timeout:25];
          (
            ${selectedFilters.map((f) => `${f.query}(${bbox});`).join("\n")}
          );
          out body;
        `;

        const fullUrl = `${config.overPassUrl}?data=${encodeURIComponent(query)}}`;

        const response = await fetch(fullUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const { elements } = (await response.json()) as { elements: OverpassElement[] };

        setPois(elements);
      } catch (e) {
        console.error("Error fetching POIs:", e);
        setError("Failed to load POIs");
      } finally {
        setLoading(false);
      }
    };

    void fetchPOIs();
  }, [selectedFilters, bbox, fetchTrigger, setPois]);

  return { loading, error };
};
