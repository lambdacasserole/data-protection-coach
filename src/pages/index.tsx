import Head from "next/head";
import { Favicon } from "~/components/Favicon";

/**
 * The website homepage.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>Blank Application</title>
        <meta name="description" content="Blank application" />
        <Favicon />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-6 pt-12">
          <div className="mt-12 rounded border border-neutral-400 bg-neutral-50 px-6 py-5 font-mono text-neutral-400">
            There&apos;s nothing here.
          </div>
        </div>
      </main>
    </>
  );
}
