"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";

import { getEventStats } from "@/lib/api";

export default function RiskCards({
  month,
}: {
  month: number;
}) {
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    getEventStats(month).then(
      setStats
    );
  }, [month]);

  if (!stats) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Events",
      value: stats.total_events,
    },
    {
      title: "High Risk",
      value: stats.high_risk,
    },
    {
      title: "Critical",
      value: stats.critical,
    },
    {
      title: "Hotspots",
      value: stats.hotspots,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="p-6"
        >
          <p className="text-sm text-muted-foreground">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {card.value}
          </h2>
        </Card>
      ))}
    </div>
  );
}