# ColdProof website

A full-stack, multi-page product website for the ColdProof smart refrigerator backup concept. It includes a responsive product experience, live outage-status simulation, a refrigerator runtime estimator, and a D1-backed pilot signup flow with a dedicated success page.

## Open in VS Code

1. Extract the project folder.
2. Open the `coldproof` folder in VS Code.
3. Open the integrated terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local address shown in the terminal.

## Useful commands

- `npm run dev` starts the development server.
- `npm run build` creates the production build.
- `npm run db:generate` creates a database migration after schema changes.

## Project structure

- `app/` contains the home page and all route pages.
- `components/site/` contains shared navigation, footer, monitor, calculator, and pilot-form components.
- `app/globals.css` contains the complete brand system and responsive styling.
- `app/api/` contains backend API routes.
- `db/schema.ts` defines the pilot waitlist database.
- `public/` contains the ColdProof logo and favicon.

## Website routes

- `/` - Product introduction and overview
- `/product` - Complete product story and comparison
- `/technology` - Architecture, modules, and validation plan
- `/monitor` - Interactive outage-monitoring experience
- `/runtime` - Interactive backup-runtime estimator
- `/pricing` - Current pricing hypotheses
- `/pilot` - Pilot application form
- `/pilot/success` - Dedicated post-submission confirmation

## Backend endpoints

- `GET /api/product` returns product information.
- `GET /api/status?mode=outage` returns a simulated device status.
- `POST /api/runtime-estimate` calculates expected backup runtime.
- `POST /api/waitlist` validates and saves pilot applications.

The hosted version uses a Cloudflare D1 database. Local database-backed form testing requires a compatible Cloudflare development environment; the other API routes work without persistent storage.
