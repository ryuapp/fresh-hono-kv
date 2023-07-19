import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <body class="bg-[#86efac]">
      <Component />
    </body>
  );
}
