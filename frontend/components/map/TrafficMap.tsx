"use client";

import { useEffect, useState } from "react";
import HeatLayer from "./HeatLayer";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Hotspot = {
  lat_grid: number;
  lon_grid: number;
  count: number;
};

type HeatPoint = {
  lat_grid: number;
  lon_grid: number;
  intensity: number;
};

export default function TrafficMap({
  month,
}: {
  month: number;
}) {
  const [hotspots, setHotspots] =
    useState<Hotspot[]>([]);

  const [heatmap, setHeatmap] =
    useState<HeatPoint[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const hotspotResponse =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/hotspots`
          );

        const hotspotData =
          await hotspotResponse.json();

        setHotspots(hotspotData);

        const heatmapResponse =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/heatmap?month=${month}`
          );

        const heatmapData =
          await heatmapResponse.json();

        setHeatmap(heatmapData);
      } catch (error) {
        console.error(
          "Error loading map data:",
          error
        );
      }
    }

    loadData();
  }, [month]);

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={11}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <HeatLayer data={heatmap} />

      {hotspots.map(
        (spot, index) => (
          <Marker
            key={index}
            position={[
              spot.lat_grid,
              spot.lon_grid,
            ]}
          >
            <Popup>
              Events: {spot.count}
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}