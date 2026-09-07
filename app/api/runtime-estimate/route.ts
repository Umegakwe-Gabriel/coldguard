const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const capacityWh = Number(body.capacityWh);
    const averageLoadW = Number(body.averageLoadW);
    const inverterEfficiency = Number(body.inverterEfficiency);
    if (![capacityWh, averageLoadW, inverterEfficiency].every(Number.isFinite)) {
      return Response.json({ error: "Capacity, load, and efficiency must be numbers." }, { status: 400 });
    }
    if (capacityWh < 300 || capacityWh > 10000 || averageLoadW < 20 || averageLoadW > 2000) {
      return Response.json({ error: "The inputs are outside the supported planning range." }, { status: 400 });
    }
    const efficiency = clamp(inverterEfficiency, 0.6, 0.98);
    const usableEnergyWh = capacityWh * efficiency * 0.8;
    const hours = usableEnergyWh / averageLoadW;
    return Response.json({
      hours: Number(hours.toFixed(1)),
      conservativeHours: Number((hours * 0.85).toFixed(1)),
      usableEnergyWh: Math.round(usableEnergyWh),
      message: "Planning estimate includes a 20% battery reserve. Validate with measured refrigerator load before selecting hardware.",
      assumptions: { reservePercent: 20, efficiency, averageLoadW, capacityWh },
    });
  } catch {
    return Response.json({ error: "Unable to read calculator inputs." }, { status: 400 });
  }
}
