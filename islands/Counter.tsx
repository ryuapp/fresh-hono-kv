import { useEffect, useState } from "preact/hooks";
import Button from "../islands/Button.tsx";
import { hc } from "$hono";
import type { AppType } from "../routes/api/[...path].ts";

const client = hc<AppType>("/");

async function getCount() {
  const res = await client.api.count.$get();
  
  return await res.json();
}
async function postCount(count: number) {
  const body = {"json":{ count }}
  const res = await client.api.count.$post(body);
  
  return await res.json();
}

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCount().then((data) => setCount(data.count));
  }, []);

  return (
    <div class="flex gap-8 py-6">
      <Button
        onClick={async () => {
          await postCount(count - 1);
          setCount(count - 1);
        }}
      >
        -1
      </Button>
      <p class="text-3xl">{count}</p>
      <Button
        onClick={async () => {
          await postCount(count + 1);
          setCount(count + 1);
        }}
      >
        +1
      </Button>
    </div>
  );
}
