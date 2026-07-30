"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet.heat";

type HeatPoint = {
  lat_grid: number;
  lon_grid: number;
  intensity: number;
};

export default function HeatLayer({
  data,
}: {
  data: HeatPoint[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!data.length) return;

    const points = data.map((point) => [
      point.lat_grid,
      point.lon_grid,
      point.intensity,
    ]);

    const heatLayer = (L as any).heatLayer(
      points,
      {
        radius: 50,
        blur: 35,
        maxZoom: 17,
         gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "yellow",
        0.8: "orange",
        1.0: "red",
        },
      }
    );

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
}