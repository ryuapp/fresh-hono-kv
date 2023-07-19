import { type Handler } from "$fresh/server.ts";
import { Hono } from "$hono";
import { getCount, setCount } from "../../utils/db.ts";

const app = new Hono().basePath("/api");

const route = app.get("/", (c) => c.text("Hello Deno!"))
  .get("/status", (c) => c.jsonT({ status: "ok" }))
  .get("/count", async (c) => {
    const count = await getCount();
    return c.jsonT({ count: count });
  })
  .post("/count", async (c) => {
    const { count } = await c.req.json();
    const res = await setCount(count);

    if (res.ok) {
      return c.jsonT({ ok: true }, 201);
    }

    return c.jsonT({ ok: false }, 400);
  });

export const handler: Handler = (req) => route.fetch(req);
export type AppType = typeof route;
