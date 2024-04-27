import { openai } from "@/app/lib/openai";
import { edgeDbClient } from "@/app/lib/edgedb";
import e from "@/../dbschema/edgeql-js";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  // embed the text of the user.

  const { description, name } = await request.json();

  const embeddingResult = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: description,
  });

  const result = await edgeDbClient.query<{ id: string }>(
    `select(insert User {
      name := <str>$name,
      description := <str>$description,
      descriptionEmbedding := <array<float32>>$descriptionEmbedding,
    })
  `,
    {
      name: name,
      description: description,
      descriptionEmbedding: new Float32Array(embeddingResult.data[0].embedding),
    }
  );

  const user = e.select(e.User, () => ({
    id: true,
    name: true,
    description: true,
    filter_single: { id: result[0].id },
  }));

  const userResult = await user.run(edgeDbClient);

  return Response.json({
    user: userResult,
  });
}

// User table
