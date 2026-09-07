import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { pilotSignups } from "@/db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const fullName = String(body.fullName ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
    const segment = String(body.segment ?? "").trim().slice(0, 120);
    const postalCode = String(body.postalCode ?? "").trim().slice(0, 10);
    const outageExperience = String(body.outageExperience ?? "").trim().slice(0, 700);
    const consent = body.consent === "yes" || body.consent === true;
    if (!fullName || !emailPattern.test(email) || !segment || !consent) {
      return Response.json({ error: "Please complete the required fields and confirm your consent." }, { status: 400 });
    }
    if (postalCode && !/^\d{5}(?:-\d{4})?$/.test(postalCode)) {
      return Response.json({ error: "Please enter a valid U.S. ZIP code." }, { status: 400 });
    }
    const db = getDb();
    const existing = await db.select({ id: pilotSignups.id }).from(pilotSignups).where(eq(pilotSignups.email, email)).limit(1);
    if (existing.length) {
      await db.update(pilotSignups).set({ fullName, segment, postalCode: postalCode || null, outageExperience: outageExperience || null, consent: true }).where(eq(pilotSignups.email, email));
      return Response.json({ ok: true, updated: true });
    }
    const [signup] = await db.insert(pilotSignups).values({ fullName, email, segment, postalCode: postalCode || null, outageExperience: outageExperience || null, consent: true }).returning({ id: pilotSignups.id });
    return Response.json({ ok: true, id: signup.id }, { status: 201 });
  } catch (error) {
    console.error("pilot signup failed", error);
    return Response.json({ error: "Pilot registration is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
