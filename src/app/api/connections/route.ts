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
  const result = await edgeDbClient.query<{ id: string }>(
    `select User {id, name, description, descriptionEmbedding}
    order by ext::pgvector::cosine_distance(User.descriptionEmbedding, <openAIEmbedding>$inputEmbedding) limit 10
    `,
    {
      inputEmbedding: user.descriptionEmbedding,
    }
  );

  const users = await Promise.all(
    result.map(async (resultingUser) => {
      const fullUser = await loadUserById(resultingUser.id);
      return {
        distance: cosine_distance(
          Array.from(fullUser!.descriptionEmbedding),
          Array.from(user.descriptionEmbedding)
        ),
        name: fullUser!.name,
        description: fullUser!.description,
      };
    })
  );

  return Response.json({ users: users });
}

const cosine_distance = (a: number[], b: number[]) => {
  const dot = (a: number[], b: number[]) =>
    a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

  const magnitude = (a: number[]) =>
    Math.sqrt(a.map((x) => x * x).reduce((m, n) => m + n));

  return dot(a, b) / (magnitude(a) * magnitude(b));
};
