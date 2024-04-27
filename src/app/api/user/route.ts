import { openai } from "@/app/lib/openai";

export const dynamic = "force-dynamic";
export async function POST() {
  // embed the text of the user.
  //
  const embeddingResult = await openai.embeddings.create({
    model: "text-davinci-003",
    input: "Hello, world!",
  });

  return Response.json({ message: "Hello, world!" });
}

// User table
