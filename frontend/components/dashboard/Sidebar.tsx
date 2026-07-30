import {
  Calendar,
  Map,
  Route,
  Activity,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    icon: Activity,
  },
  {
    name: "Events",
    icon: Calendar,
  },
  {
    name: "Hotspots",
    icon: Map,
  },
  {
    name: "Diversions",
    icon: Route,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r h-full">
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}