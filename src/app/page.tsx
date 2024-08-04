import { HydrateClient } from "~/trpc/server";
import Header from "./_components/header";
import OfferTab from "./_components/offerTab";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-white ">
        <Header />
        <OfferTab />
      </main>
    </HydrateClient>
  );
}
