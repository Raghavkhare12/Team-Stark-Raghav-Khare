import { Activity } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6" />
        <h1 className="text-xl font-bold">
          Event Traffic Intelligence
        </h1>
      </div>

      <div className="text-sm text-muted-foreground">
        Bengaluru Traffic Command Center
      </div>
    </header>
  );
}