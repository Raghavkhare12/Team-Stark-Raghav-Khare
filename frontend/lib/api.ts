const API =
  process.env.NEXT_PUBLIC_API_URL;

export async function getEventStats(month?: number) {
  const res = await fetch(
    `${API}/event-stats${
      month ? `?month=${month}` : ""
    }`
  );

  return res.json();
}

export async function getHotspots() {
  const res = await fetch(
    `${API}/hotspots`
  );

  return res.json();
}

export async function getEventCauses(
  month?: number
) {

  const res = await fetch(
    `${API}/event-causes${
      month
      ? `?month=${month}`
      : ""
    }`
  );

  return res.json();
}

export async function getCalendarEvents() {
  const res = await fetch(
    `${API}/calendar`
  );

  return res.json();
}

export async function getHeatmap() {
  const res = await fetch(
    `${API}/heatmap`
  );

  return res.json();
}