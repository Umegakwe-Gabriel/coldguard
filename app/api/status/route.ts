export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isOutage = url.searchParams.get("mode") !== "grid";
  const minute = new Date().getUTCMinutes();
  const batteryPercent = isOutage ? 76 + (minute % 5) : 100;
  const runtimeHours = Math.round((batteryPercent / 100) * 22);
  const temperatureF = 36 + (minute % 3);
  const loadWatts = 118 + (minute % 5) * 4;
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date()) + " UTC";
  return Response.json({
    mode: isOutage ? "backup" : "grid", batteryPercent, runtimeHours, temperatureF, loadWatts, cellular: "connected",
    events: isOutage ? [
      { label: "Backup active", time, detail: "Transfer completed automatically" },
      { label: "Owner notified", time, detail: "Cellular alert delivered" },
      { label: "Temperature safe", time: "Now", detail: `Holding at ${temperatureF}°F` },
    ] : [
      { label: "Grid power normal", time: "Now", detail: "Battery charging and ready" },
      { label: "Temperature safe", time: "Now", detail: `Holding at ${temperatureF}°F` },
    ],
  }, { headers: { "Cache-Control": "no-store" } });
}
