"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card } from "@/components/ui/card";

import { getEventCauses } from "@/lib/api";
  type Props = {
  month: number;
  };
export default function EventCauseChart({
  month,
}: Props) {
  const [data, setData] =
    useState<any[]>([]);

  useEffect(() => {
    getEventCauses(month).then((res) => {
      setData(res.slice(0, 8));
    });
  }, [month]);

  return (
    <Card className="h-[500px] p-4">
      <h2 className="font-semibold mb-4">
        Event Causes
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <BarChart data={data}>
          <XAxis dataKey="cause" />
          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}