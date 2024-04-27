import { openai } from "@/app/lib/openai";
import { edgeDbClient } from "@/app/lib/edgedb";
import e from "@/../dbschema/edgeql-js";

export const buildUser = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
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

  const userResult = loadUserById(result[0].id);
  return userResult;
};

export const loadUserById = async (id: string) => {
  const user = e.select(e.User, () => ({
    id: true,
    name: true,
    description: true,
    descriptionEmbedding: true,
    filter_single: { id },
  }));

  return await user.run(edgeDbClient);
};
