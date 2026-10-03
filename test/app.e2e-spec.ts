import { describe, expect, test } from "bun:test";
import { toFetchHandler } from "@rhythmjs/router/fetch";
import { appModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  const app = toFetchHandler(appModule);

  test("/ (GET)", async () => {
    const res = await app(new Request("http://localhost/"));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await res.text()).toBe("Hello World!");
  });

  test("/missing (GET) hits the module's not-found handler", async () => {
    const res = await app(new Request("http://localhost/missing"));

    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("application/json; charset=utf-8");
    expect(await res.json()).toEqual({ success: false, status: 404, message: "Not Found" });
  });
});
