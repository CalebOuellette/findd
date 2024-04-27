import { edgeDbClient } from "@/app/lib/edgedb";
import { loadUserById } from "@/app/controllers/user";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  // load users close to the user

  const { id } = await req.json();

  const user = await loadUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  // <array<float32>>$descriptionEmbedding
  const result = await edgeDbClient.query<{
    id: string;
    name: string;
    description: string;
    descriptionEmbedding: Float32Array;
  }>(
    `select User {id, name, description, descriptionEmbedding}

    order by ext::pgvector::cosine_distance(User.descriptionEmbedding, <openAIEmbedding>$inputEmbedding) limit 4
    `,
    {
      inputEmbedding: user.descriptionEmbedding,
    }
  );

  const users = await Promise.all(
    result.map(async (resultingUser) => {
      return {
        distance: cosine_distance(
          Array.from(resultingUser!.descriptionEmbedding),
          Array.from(user.descriptionEmbedding)
        ),
        name: resultingUser!.name,
        description: resultingUser!.description,
        id: resultingUser!.id,
      };
    })
  );

  return Response.json({ users: users.filter((u) => u.id !== user.id) });
}

const cosine_distance = (a: number[], b: number[]) => {
  const dot = (a: number[], b: number[]) =>
    a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

  const magnitude = (a: number[]) =>
    Math.sqrt(a.map((x) => x * x).reduce((m, n) => m + n));

  return dot(a, b) / (magnitude(a) * magnitude(b));
};
