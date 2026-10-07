# template

The starter template for [Rhythm](https://github.com/rhythmjs/rhythm), the Bun-native backend
framework: a module, a controller, and a service, wired together on the onion middleware kernel.

## Structure

```
src/
  main.ts bootstraps the Bun server
  app.module.ts Rhythm instance: registers the service on its context, mounts the controller
  app.controller.ts RhythmRouter instance: routes and handlers
  app.service.ts plain class holding the business logic
```

- The **service** is a plain class. The **module** registers it with `decorate(() => ({ appService }))`, which makes it available
  on the request context of everything mounted on it.
- The **controller** is a `RhythmRouter` typed as `RhythmRouter<AppContext>`, so `ctx.appService` is fully
  typed inside every handler. The module mounts it with `.use(mount(appController))`.
- **main.ts** serves the module with a plain `Bun.serve` call; `toFetchHandler(appModule)` from `@rhythmjs/router/fetch` is its `fetch`.

## Getting started

```sh
bun install
bun run dev # bun --watch src/main.ts
```

Then:

```sh
curl http://localhost:3000/ # Hello World!
curl http://localhost:3000/missing # Not Found
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
a `prefix`), register the service with `decorate` in `app.module.ts`, and mount the controller with `.use(mount(...))`
before the default 404. Validation, sessions, logging, CORS, and friends are available as
[`@rhythmjs/middleware`](https://github.com/rhythmjs/middleware), [`@rhythmjs/http`](https://github.com/rhythmjs/http),
[`@rhythmjs/observability`](https://github.com/rhythmjs/observability), and
[`@rhythmjs/security`](https://github.com/rhythmjs/security).
