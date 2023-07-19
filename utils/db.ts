/// <reference lib="deno.unstable" />
const kv = await Deno.openKv();

const PREFIX = ["count"];

export async function getCount() {
  const res = await kv.get<number>(PREFIX);
  if (!res.value) {
    await setCount(3);
    return 3;
  }

  return res.value;
}

export async function setCount(newCount: number) {
  const res = await kv.set(PREFIX, newCount);

  return res;
}
