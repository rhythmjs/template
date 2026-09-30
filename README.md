# template

The starter template for [Rhythm](https://github.com/rhythmjs/rhythm), the Bun-native backend
framework: a module, a controller, and a service, wired together on the onion middleware kernel.

## Structure

```
src/
  main.ts bootstraps the Bun server
  app.module.ts Rhythm instance: provides the service, mounts the controller, handles 404s
  app.controller.ts RhythmRouter instance: routes and handlers
  app.service.ts plain class holding the business logic
```

- The **service** is a plain class. The **module** provides it with `.provide()`, which makes it available
  on the request context of everything mounted after it.
- The **controller** is a `RhythmRouter` typed as `RhythmRouter<AppContext>`, so `ctx.appService` is fully
  typed inside every handler. The module mounts it with `.use(appController.routes())`.
- **main.ts** serves the module with a plain `Bun.serve` call; `toFetchHandler(appModule)` from `@rhythmjs/router/fetch` is its `fetch`.

## Getting started

```sh
bun install
bun run dev # bun --watch src/main.ts
```

Then:

```sh
curl http://localhost:3000/ # Hello World!
curl http://localhost:3000/missing # {"success":false,"status":404,"message":"Not Found"}
```

## Scripts

```sh
bun run dev # run with reload on change
bun run start # run once
bun test # bun test runner
bun run typecheck # tsc --noEmit
bun run check # prettier --check + oxlint + tsc
```

## Growing the app

Add a feature by repeating the pattern: a `users.service.ts` class, a `users.controller.ts` router (give it
a `prefix`), provide the service in `app.module.ts`, and mount the controller with `.use(...routes())`
before the 404 handler. Validation, sessions, logging, CORS, and friends are available as
[`@rhythmjs/middleware`](https://github.com/rhythmjs/middleware), [`@rhythmjs/http`](https://github.com/rhythmjs/http),
[`@rhythmjs/observability`](https://github.com/rhythmjs/observability), and
[`@rhythmjs/security`](https://github.com/rhythmjs/security).
