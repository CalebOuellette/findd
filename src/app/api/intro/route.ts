import { OpenAIStream, StreamingTextResponse } from "ai";

import { loadUserById } from "@/app/controllers/user";
import { openai } from "@/app/lib/openai";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  // load users close to the user

  const { id, connectionUserId } = await req.json();

  const user = await loadUserById(id);
  const connectionUser = await loadUserById(connectionUserId);

  if (!user || !connectionUser) {
    throw new Error("User not found");
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        content:
          "Your job is to write a nice short introduction for two users. I will send you a description of the two users and you should respond with a short paragraph introducing the two users to each other. Highlight what they have in common and suggest one topic start the conversation with.",
        role: "system",
      },
      {
        content: `here are the two descriptions
        
        ${user.name}: ${user.description}\n \n ${connectionUser.name}: ${connectionUser.description}`,
        role: "user",
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
