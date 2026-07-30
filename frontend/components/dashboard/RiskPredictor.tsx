"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const eventTypes = [
  "planned",
  "unplanned",
];

const eventCauses = [
  "vehicle_breakdown",
  "accident",
  "construction",
  "water_logging",
  "tree_fall",
  "congestion",
  "public_event",
  "procession",
  "protest",
  "road_conditions",
];

const zones = [
  "Central Zone 1",
  "Central Zone 2",
  "East Zone 1",
  "East Zone 2",
  "North Zone 1",
  "North Zone 2",
  "South Zone 1",
  "South Zone 2",
  "West Zone 1",
  "West Zone 2",
];

const corridors = [
  "Non-corridor",
  "Mysore Road",
  "Bellary Road 1",
  "Bellary Road 2",
  "Tumkur Road",
];

export default function RiskPredictor() {
  const [eventType, setEventType] =
    useState("planned");

  const [eventCause, setEventCause] =
    useState("construction");

  const [zone, setZone] =
    useState("Central Zone 2");

  const [corridor, setCorridor] =
    useState("Mysore Road");

  const [roadClosure, setRoadClosure] =
    useState(true);

  const [hour, setHour] =
    useState(18);

  const [result, setResult] =
    useState<any>(null);

  async function predictRisk() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/predict-risk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: eventType,
          event_cause: eventCause,
          requires_road_closure:
            roadClosure,
          hour: hour,
          day_of_week: 5,
          month: 8,
          weekend: 1,
          zone: zone,
          corridor: corridor,
          junction: "MekhriCircle",
          latitude: 12.98,
          longitude: 77.59,
          event_density: 120,
        }),
      }
    );

    const data =
      await response.json();

    setResult(data);
  }

  return (
    <Card className="h-full">
      <CardContent className="p-5 space-y-4">

        <h2 className="text-lg font-semibold">
          Live Risk Predictor
        </h2>

        <div className="space-y-3">

          <div>
            <p className="text-sm mb-1">
              Event Type
            </p>

            <Select
              value={eventType}
              onValueChange={setEventType}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {eventTypes.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1">
              Event Cause
            </p>

            <Select
              value={eventCause}
              onValueChange={setEventCause}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {eventCauses.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1">
              Zone
            </p>

            <Select
              value={zone}
              onValueChange={setZone}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {zones.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1">
              Corridor
            </p>

            <Select
              value={corridor}
              onValueChange={setCorridor}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {corridors.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm mb-1">
              Road Closure
            </p>

            <Select
              value={
                roadClosure
                  ? "yes"
                  : "no"
              }
              onValueChange={(value) =>
                setRoadClosure(
                  value === "yes"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="yes">
                  Yes
                </SelectItem>

                <SelectItem value="no">
                  No
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <p className="text-sm mb-2">
              Hour: {hour}:00
            </p>

            <Slider
              min={0}
              max={23}
              step={1}
              value={[hour]}
              onValueChange={(value) =>
                setHour(value[0])
              }
            />
          </div>

          <Button
            className="w-full"
            onClick={predictRisk}
          >
            Predict Risk
          </Button>
        </div>

        {result && (
          <Card className="mt-4">
            <CardContent className="p-4">

              <h3 className="font-semibold mb-4">
                Operational Plan
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Risk Level
                  </p>

                  <p className="font-bold text-red-500 text-lg">
                    {result.risk_level}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Confidence
                  </p>

                  <p className="font-bold">
                    {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Officers
                  </p>

                  <p className="font-bold text-lg">
                    {result.officers}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Barricades
                  </p>

                  <p className="font-bold text-lg">
                    {result.barricades}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Diversions
                  </p>

                  <p className="font-bold text-lg">
                    {result.diversions}
                  </p>
                </div>

              </div>

            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}