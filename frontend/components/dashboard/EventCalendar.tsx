"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";

import { getCalendarEvents } from "@/lib/api";

type EventItem = {
  date: string;
  event_cause: string;
  risk_level: string;
  count: number;
};

export default function EventCalendar() {
  const [events, setEvents] =
    useState<EventItem[]>([]);

  useEffect(() => {
    getCalendarEvents().then(
      (data) => {
        setEvents(data.slice(0, 10));
      }
    );
  }, []);

  function riskEmoji(
    risk: string
  ) {
    switch (risk) {
      case "Critical":
        return "🔴";

      case "High":
        return "🟠";

      case "Medium":
        return "🟡";

      default:
        return "🟢";
    }
  }

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">
        Event Intelligence Calendar
      </h2>

      <div className="space-y-3">

        {events.map(
          (event, index) => (
            <div
              key={index}
              className="border-b pb-2"
            >

              <div className="flex justify-between">

                <span>
                  {event.date}
                </span>

                <span>
                  {riskEmoji(
                    event.risk_level
                  )}
                </span>

              </div>

              <div className="text-sm text-muted-foreground">

                {event.event_cause}

              </div>

            </div>
          )
        )}

      </div>
    </Card>
  );
}