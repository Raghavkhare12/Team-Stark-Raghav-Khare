"use client";

import { useState } from "react";

export default function EventSimulator() {
  const [result, setResult] = useState<any>(null);

  const [crowdSize, setCrowdSize] =
    useState(500);

  const [loading, setLoading] =
  useState(false);

  const [lastUpdated, setLastUpdated] =
  useState("");

  const [form, setForm] = useState({
    event_type: "planned",
    event_cause: "construction",
    requires_road_closure: true,
    hour: 18,
    day_of_week: 5,
    month: 8,
    weekend: 1,
    zone: "Central Zone 2",
    corridor: "Mysore Road",
    junction: "MekhriCircle",
    latitude: 12.98,
    longitude: 77.59,
    event_density: 120,
  });

  async function simulate() {
    setLoading(true);
    try {
      const riskRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict-risk`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
          ...form,
          crowd_size: crowdSize
          }),
        }
      );

      const riskData =
        await riskRes.json();

      const resourceRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resource-plan?event_cause=${form.event_cause}&risk_level=${riskData.risk_level}&crowd_size=${crowdSize}&hour=${form.hour}`
      );

      const resourceData =
        await resourceRes.json();

      let severity =
        "Low";

      if (
        riskData.risk_level ===
        "Critical"
      ) {
        severity =
          "Extreme";
      } else if (
        riskData.risk_level ===
        "High"
      ) {
        severity =
          "High";
      } else if (
        riskData.risk_level ===
        "Medium"
      ) {
        severity =
          "Moderate";
      }

      setResult({
        ...riskData,
        ...resourceData,
        severity,
      });
      setLastUpdated(
      new Date().toLocaleTimeString()
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-xl">
          Event Simulator
        </h2>

        <span className="text-sm text-gray-500">
          Scenario Planning
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="text-sm font-medium block mb-2">
            Event Cause
          </label>

          <select
            className="w-full border rounded-lg p-2"
            value={
              form.event_cause
            }
            onChange={(e) =>
              setForm({
                ...form,
                event_cause:
                  e.target.value,
              })
            }
          >
            <option value="construction">
              Construction
            </option>

            <option value="accident">
              Accident
            </option>

            <option value="vehicle_breakdown">
              Vehicle Breakdown
            </option>

            <option value="water_logging">
              Water Logging
            </option>

            <option value="public_event">
              Public Event
            </option>

            <option value="procession">
              Procession
            </option>

            <option value="protest">
              Protest
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Zone
          </label>

          <select
            className="w-full border rounded-lg p-2"
            value={form.zone}
            onChange={(e) =>
              setForm({
                ...form,
                zone:
                  e.target.value,
              })
            }
          >
            <option>
              Central Zone 1
            </option>
            <option>
              Central Zone 2
            </option>
            <option>
              East Zone 1
            </option>
            <option>
              East Zone 2
            </option>
            <option>
              North Zone 1
            </option>
            <option>
              North Zone 2
            </option>
            <option>
              South Zone 1
            </option>
            <option>
              South Zone 2
            </option>
            <option>
              West Zone 1
            </option>
            <option>
              West Zone 2
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Crowd Size
          </label>

          <input
            type="range"
            min="100"
            max="10000"
            value={crowdSize}
            onChange={(e) =>
              setCrowdSize(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />

          <div className="text-sm text-gray-500 mt-1">
            {crowdSize.toLocaleString()} people
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Event Hour
          </label>

          <input
            type="range"
            min="0"
            max="23"
            value={form.hour}
            onChange={(e) =>
              setForm({
                ...form,
                hour: Number(
                  e.target.value
                ),
              })
            }
            className="w-full"
          />

          <div className="text-sm text-gray-500 mt-1">
            {form.hour}:00
          </div>
        </div>

      </div>

      <div className="mb-4 text-sm text-gray-600">

        <strong>Scenario:</strong>

        {form.event_cause}
        {" • "}
        {form.zone}
        {" • "}
        {crowdSize.toLocaleString()} people
        {" • "}
        {form.hour}:00

      </div>

      <button
        onClick={simulate}
        disabled={loading}
        className="
          w-full
          mt-6
          bg-black
          text-white
          py-3
          rounded-lg
          font-medium
          transition
          disabled:opacity-50
        "
      >

        {loading
          ? "Running Simulation..."
          : "Simulate Event"}

      </button>

      {result && (
        <div
          className="
            mt-6
            border
            rounded-xl
            p-4
            bg-green-50
            animate-pulse
          "
        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">
              Simulation Results
            </h3>

            <span className="text-xs text-gray-500">
              Updated: {lastUpdated}
            </span>

          </div>

          <div className="grid grid-cols-3 gap-4">

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Risk Level
              </p>

              <p className="font-bold text-red-600 text-lg">
                {
                  result.risk_level
                }
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Confidence
              </p>

              <p className="font-bold text-lg">
                {(
                  result.confidence *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Severity
              </p>

              <p className="font-bold text-lg">
                {
                  result.severity
                }
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Officers
              </p>

              <p className="font-bold text-lg">
                {
                  result.officers
                }
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Barricades
              </p>

              <p className="font-bold text-lg">
                {
                  result.barricades
                }
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-500">
                Diversions
              </p>

              <p className="font-bold text-lg">
                {
                  result.diversions
                }
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}