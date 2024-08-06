import { HydrateClient } from "~/trpc/server";
import Interests from "./_components/interests";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Interests />
    </HydrateClient>
  );
}
