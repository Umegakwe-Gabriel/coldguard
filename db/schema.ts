import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const pilotSignups = sqliteTable(
  "pilot_signups",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    segment: text("segment").notNull(),
    postalCode: text("postal_code"),
    outageExperience: text("outage_experience"),
    consent: integer("consent", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("idx_pilot_signups_email").on(table.email)]
);
