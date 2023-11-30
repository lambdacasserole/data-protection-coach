import OpenAI from "openai";
import { env } from "~/env";

/**
 * Prompts the OpenAI API with the input specified and returns the output produced.
 * 
 * This function uses the OpenAI API (*not* the Azure OpenAI API).
 *
 * @returns the model output
 */
export async function askChatGpt(message: string) {
  // Initialize OpenAI API client.
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: "user", content: message }],
    model: "gpt-4",
  };
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  // Return response.
  const completion = await openai.chat.completions.create(params);
  return completion.choices[0]?.message.content ?? "";
}