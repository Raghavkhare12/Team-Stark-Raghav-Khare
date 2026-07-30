"use client";

import dynamic from "next/dynamic";

const TrafficMap = dynamic(
  () => import("./TrafficMap"),
  {
    ssr: false,
  }
);

type MapViewProps = {
  month: number;
};

export default function MapView({
  month,
}: MapViewProps) {
  return (
    <div className="h-[500px] rounded-xl overflow-hidden border bg-white shadow-sm">
      <TrafficMap month={month} />
    </div>
  );
}