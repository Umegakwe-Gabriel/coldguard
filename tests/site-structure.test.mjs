import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const routeFiles = [
  "app/page.tsx", "app/about/page.tsx", "app/product/page.tsx", "app/technology/page.tsx",
  "app/monitor/page.tsx", "app/runtime/page.tsx", "app/pricing/page.tsx",
  "app/pilot/page.tsx", "app/pilot/success/page.tsx",
];

test("ships every public ColdGuard route", async () => {
  await Promise.all(routeFiles.map((file) => access(path.join(root, file))));
});

test("redirects a successful pilot application to its own page", async () => {
  const form = await readFile(path.join(root, "components/site/pilot-form.tsx"), "utf8");
  assert.match(form, /router\.push\("\/pilot\/success"\)/);
  assert.match(form, /fetch\("\/api\/waitlist"/);
});

test("includes the product visuals and responsive design rules", async () => {
  await Promise.all(["coldguard-home.webp", "coldguard-modules.webp", "coldguard-unit.webp", "coldguard-logo.svg"].map((file) => access(path.join(root, "public", file))));
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  assert.match(css, /@media\(max-width:680px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /body:has\(\.success-page\)/);
});

test("includes the working backend routes and database migration", async () => {
  await Promise.all([
    "app/api/product/route.ts", "app/api/status/route.ts",
    "app/api/runtime-estimate/route.ts", "app/api/waitlist/route.ts",
    "db/schema.ts", "drizzle/0000_yellow_hellion.sql",
  ].map((file) => access(path.join(root, file))));
});
