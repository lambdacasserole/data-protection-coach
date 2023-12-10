import { PromptType } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { CheckButton } from "~/components/CheckButton";
import { Favicon } from "~/components/Favicon";
import { Spinner } from "~/components/Spinner";
import { TextField } from "~/components/TextField";
import { api } from "~/utils/api";

/**
 * The website frontend (the page the user interacts with).
 */
export default function Home() {
  // Keep a record of our currently selected prompt type (which button is checked on the frontend).
  const [promptType, setPromptType] = useState<PromptType>(
    PromptType.BUSINESS_SECTOR,
  );

  // Store our prompt (in the text box).
  const [prompt, setPrompt] = useState<string>("");

  // Store the result we get back from ChatGPT.
  const [result, setResult] = useState<string | null>(null);

  // This just lets us talk to our web application's backend.
  const submitQuery = api.query.submitQuery.useMutation({
    onSuccess: (result) => setResult(result),
  });

  // This is the contents of the page itself.
  return (
    <>
      <Head>
        <title>Data Protection Coach</title>
        <meta
          name="description"
          content="Data Protection Coach: Your coach on staying GDPR compliant in the workplace!"
        />
        <link rel="icon" href="/favicon.ico" />
        <Favicon />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-6 pt-12">
          {/* Logo. */}
          <Image src="/logo.svg" height={128} width={306} alt="Logo" />

          {/* Introductory text. */}
          <div>What do I need to know regarding the GDPR and my...</div>

          {/* Our row of prompt type buttons (business sector, database contents and job role). */}
          <div className="flex gap-6">
            <CheckButton
              onClick={() => setPromptType(PromptType.BUSINESS_SECTOR)}
              text="Business sector"
              checked={promptType === PromptType.BUSINESS_SECTOR}
            />
            <CheckButton
              onClick={() => setPromptType(PromptType.DATABASE_CONTENTS)}
              text="Database contents"
              checked={promptType === PromptType.DATABASE_CONTENTS}
            />
            <CheckButton
              onClick={() => setPromptType(PromptType.JOB_ROLE)}
              text="Job role"
              checked={promptType === PromptType.JOB_ROLE}
            />
          </div>

          {/* Some more text. */}
          <div>Which is...</div>

          {/* The text field into which our user enters their prompt. */}
          <TextField onChange={(value) => setPrompt(value)} />

          {/* The submit button! */}
          <CheckButton
            onClick={() => submitQuery.mutate({ promptType, prompt })}
            text="What do I need to know?"
            loading={submitQuery.isLoading}
          />

          {/* The result box. We only show this once the submit button is clicked. */}
          {(result !== null || submitQuery.isLoading) && (
            <div className="w-[512px] rounded border border-neutral-300 bg-neutral-50 p-4">
              {submitQuery.isLoading ? (
                <div className="flex w-full place-content-center items-center">
                  {/* Show the loading spinner if we're still waiting for a response. */}
                  <Spinner />
                </div>
              ) : (
                result
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
