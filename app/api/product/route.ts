export async function GET() {
  return Response.json({
    product: "ColdProof",
    promise: "Know it stayed cold—even when the power and Wi-Fi went out.",
    developmentStatus: "concept prototype",
    targetRuntimeHours: 24,
    subsystems: ["UPS power", "cellular link", "temperature sensing", "local control software"],
    pricingHypotheses: { monitoringAddon: "$149–$299", oneKwhUnit: "$799–$999", twoKwhUnit: "$1,299–$1,599", cellularMonthly: "$3–$8" },
  });
}
