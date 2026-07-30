"use client";

import { useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import RiskCards from "@/components/dashboard/RiskCards";
import Timeline from "@/components/dashboard/Timeline";
import MapView from "@/components/map/MapView";
import EventCauseChart from "@/components/dashboard/EventCauseChart";
import RiskPredictor from "@/components/dashboard/RiskPredictor";
import EventCalendar from "@/components/dashboard/EventCalendar";
import EventSimulator from "@/components/dashboard/EventSimulator";

export default function Home() {
  const [month, setMonth] =
  useState(11);
  return (
    <main className="h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 p-6 overflow-auto space-y-6">

          {/* Stats */}
          <RiskCards
            month={month}
          />

          {/* Map + Right Panel */}
          <div className="grid grid-cols-12 gap-6">

            {/* Left Section */}
            <div className="col-span-8">
              <MapView month={month} />
            </div>

            {/* Right Section */}
            <div className="col-span-4 space-y-6">

              <EventCauseChart month={month} />

     

            </div>

          </div>

          {/* Simulator + Predictor */}
          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-8">
              <EventSimulator />
            </div>

            <div className="col-span-4">
              <RiskPredictor />
            </div>

          </div>

          {/* Timeline */}
          <Timeline
            month={month}
            setMonth={setMonth}
          />

          <EventCalendar />

        </div>
      </div>
    </main>
  );
}