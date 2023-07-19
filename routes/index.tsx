import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCount } from "../utils/db.ts";

export const handler: Handlers<number> = {
  async GET(_req, ctx) {
    const count = await getCount();

    return ctx.render(count);
  },
};

export default function Home(props: PageProps<number>) {
  const count = useSignal(props.data);
  return (
    <>
      <Head>
        <title>Fresh with Hono and Deno KV</title>
      </Head>
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-5xl font-bold">Fresh Hono Deno KV</h1>
          <p class="my-6">Welcome to Fresh🍋 Hono🔥 Deno KV🦕!</p>
          <div class="mb-4">
            <h2 class="text-3xl font-bold text-center">Counter</h2>
            <Counter />
          </div>
        </div>
      </div>
    </>
  );
}
