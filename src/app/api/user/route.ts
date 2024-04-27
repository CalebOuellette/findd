import { openai } from "@/app/lib/openai";
import { edgeDbClient } from "@/app/lib/edgedb";
import e from "@/../dbschema/edgeql-js";

export const dynamic = "force-dynamic";
export async function GET() {
  // embed the text of the user.

  const description = "Hello, world!";

  const embeddingResult = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: description,
  });

  await edgeDbClient.execute(
    `
    insert User {
      name := <str>$name,
      description := <str>$description,
      descriptionEmbedding := <array<float64>>$descriptionEmbedding,
    }
  `,
    {
      name: "Caleb",
      description: description,
      descriptionEmbedding: new Float64Array(embeddingResult.data[0].embedding),
    }
  );

  //  console.log(result.id);

  return Response.json({
    message: "Hello, world!",
    length: embeddingResult.data[0].embedding.length,
  });
}

// User table
