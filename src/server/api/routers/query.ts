import { PromptType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { askChatGpt } from "~/utils/askChatGpt";

/**
 * This is the website backend. Here's where we do the data processing and talking to ChatGPT.
 */
export const queryRouter = createTRPCRouter({
  submitQuery: publicProcedure
    .input(
      z.object({
        // These are sent from our web application frontend.
        prompt: z.string(), // The prompt our user entered in the text box.
        promptType: z.nativeEnum(PromptType), // The type of prompt they had selected (business sector, database contents, or job role).
      }),
    )
    .mutation(async ({ ctx, input }) => {

      // Simply ask ChatGPT a question depending on the prompt type we had selected. Include the prompt from the frontend.
      let chatGptResponse = "";
      switch (input.promptType) {
        case PromptType.BUSINESS_SECTOR:
          chatGptResponse = await askChatGpt(
            `Summarise in 2 sentences or fewer everything I need to know about GDPR compliance as a business working in the following sector: ${input.prompt}`,
          );
          break;
        case PromptType.DATABASE_CONTENTS:
          chatGptResponse = await askChatGpt(
            `Summarise in 2 sentences or fewer everything I need to know about GDPR compliance as an employee working with a database containing the following customer information: ${input.prompt}`,
          );
          break;
        case PromptType.JOB_ROLE:
          chatGptResponse = await askChatGpt(
            `Summarise in 2 sentences or fewer everything I need to know about GDPR compliance as a worker with the following role: ${input.prompt}`,
          );
          break;
      }

      // Put our prompt and the response from ChatGPT in the database (important for analytics!).
      await ctx.db.query.create({
        data: {
          prompt: input.prompt,
          response: chatGptResponse,
          promptType: input.promptType,
        },
      });

      return chatGptResponse;
    }),
});
