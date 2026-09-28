import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(async () => { await vite.close(); });

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));
  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
});

test("renders the ColdGuard brand mark with an accessible home link", async () => {
  const { Logo } = await vite.ssrLoadModule("/components/site/logo.tsx");
  const html = renderToStaticMarkup(React.createElement(Logo));
  assert.match(html, /aria-label="ColdGuard home"/);
  assert.match(html, /Cold/);
  assert.match(html, /Guard/);
});
