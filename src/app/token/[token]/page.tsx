import type { Metadata } from "next";

interface TokenPageParams {
  token: string;
}

export async function generateMetadata({
  params,
}: {
  params: TokenPageParams;
}): Promise<Metadata> {
  const { token } = params;
  const title = `Token: ${token}`;
  return {
    title,
    description: `Details and analytics for token ${token}.`,
  };
}

export default async function TokenPage({
  params,
}: {
  params: TokenPageParams;
}) {
  const { token } = params;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">{token}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Token details page. Replace this with real data for{" "}
        <strong>{token}</strong>.
      </p>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">Overview</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Symbol: {token}</li>
            <li>Name: —</li>
            <li>Network: —</li>
            <li>Contract: —</li>
          </ul>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">Market</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Price: —</li>
            <li>Market Cap: —</li>
            <li>24h Volume: —</li>
            <li>Change (24h): —</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
