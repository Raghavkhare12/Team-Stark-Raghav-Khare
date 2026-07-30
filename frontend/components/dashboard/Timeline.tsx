"use client";

import { useState, useEffect } from "react";

type Props = {
  month: number;
  setMonth: (value: number) => void;
};

const availableMonths = [
  11,
  12,
  1,
  2,
  3,
  4,
];

const monthNames: Record<number, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  11: "November",
  12: "December",
};

export default function Timeline({
  month,
  setMonth,
}: Props) {

  const [index, setIndex] =
    useState(0);

  useEffect(() => {

    const currentIndex =
      availableMonths.indexOf(month);

    if (currentIndex >= 0) {
      setIndex(currentIndex);
    }

  }, [month]);

  return (
    <div className="border rounded-xl p-4 bg-white">

      <h3 className="font-semibold mb-4">
        Historical Timeline
      </h3>

      <div className="space-y-3">

        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={index}
          onChange={(e) => {

            const newIndex =
              Number(e.target.value);

            setIndex(newIndex);

            setMonth(
              availableMonths[
                newIndex
              ]
            );
          }}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500">

          {availableMonths.map(
            (m) => (
              <span key={m}>
                {
                  monthNames[m]
                    .substring(0, 3)
                }
              </span>
            )
          )}

        </div>

        <p className="text-sm text-muted-foreground">

          Selected Month:

          <span className="font-semibold ml-2">

            {
              monthNames[
                availableMonths[
                  index
                ]
              ]
            }

          </span>

        </p>

      </div>

    </div>
  );
}