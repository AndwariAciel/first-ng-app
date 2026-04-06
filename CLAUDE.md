# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands should be run from the `first-ng-app/` directory.

```bash
npm start               # Dev server at http://localhost:4200 (auto-reloads)
npm run build           # Production build
npm run watch           # Dev build with file watching
npm test                # Run unit tests via Karma/Jasmine
npm run backend:generate  # Regenerate OpenAPI client from backend spec (backend must be running at localhost:8090)
```

To run a single test file:
```bash
npx ng test --include='**/some.component.spec.ts'
```

## Architecture

**Bootstrap:** `main.ts` → `bootstrapApplication(AppComponent, appConfig)` — uses Angular 19 standalone API, no NgModules.

**App config** (`app.config.ts`) registers global providers: `provideHttpClient()`, `provideRouter(routes)`, `provideZoneChangeDetection()`, and `provideApi("http://localhost:8090")` (backend URL).

**Routes** (`app.routes.ts`): three routes — `/home` (default), `/about`, `/timer`.

**Layers:**
- `src/app/pages/` — smart/routed components (HomeComponent, TimerComponent, AboutComponent)
- `src/app/components/` — presentational components (HeaderComponent, CardOverviewComponent, SetlistComponent)
- `src/app/services/` — business logic: SetService, CardService, TimerService (all communicate via REST)
- `src/app/models/` — TypeScript types/interfaces
- `src/app/shared/backend-api/` — auto-generated OpenAPI Angular services (do not edit manually; regenerate with `npm run backend:generate`)

**Backend:** Spring Boot REST API expected at `http://localhost:8090`. The generated client in `shared/backend-api/` includes `AppRestController.service.ts` (card sets) and `TimerRestController.service.ts`.

**UI:** Angular Material 19 with the Azure Blue theme (`azure-blue.css`), loaded globally via `angular.json`.

**TypeScript:** strict mode + `strictTemplates` + `strictInjectionParameters` enabled. Target ES2022, module resolution `"bundler"`.
