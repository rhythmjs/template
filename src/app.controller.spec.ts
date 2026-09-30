import { describe, expect, test } from "vite-plus/test";
import { Rhythm } from "@rhythmjs/rhythm";
import { toFetchHandler } from "@rhythmjs/router/fetch";
import type { RhythmHttpContext } from "@rhythmjs/router/adapters/context";
import { appController } from "./app.controller";
import { appService } from "./app.service";

const handler = (service: typeof appService = appService) =>
  toFetchHandler(
    new Rhythm<RhythmHttpContext>({ name: "test" })
      .provide(() => ({ appService: service }))
      .use(appController.middleware()),
  );

describe("AppController", () => {
  test("GET / responds 200 with the service greeting", async () => {
    const res = await handler()(new Request("http://localhost/"));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain");
    expect(await res.text()).toBe("Hello World!");
  });

  test("delegates to the provided app service", async () => {
    const stub: typeof appService = { getHello: () => "Hello from the stub!" };

    const res = await handler(stub)(new Request("http://localhost/"));

    expect(await res.text()).toBe("Hello from the stub!");
  });

  test("falls through unmatched routes without touching the response", async () => {
    const res = await handler()(new Request("http://localhost/missing"));

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });
});
