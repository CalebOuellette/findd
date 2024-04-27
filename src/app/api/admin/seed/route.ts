import { buildUser } from "@/app/controllers/user";
import { edgeDbClient } from "@/app/lib/edgedb";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  // todo validate input
  await edgeDbClient.execute(
    `
    delete User
  `
  );

  await buildUser({
    name: "caleb",
    description: "i like to go into nature and ride my bicycle.",
  });

  await buildUser({
    name: "cable",
    description: "i like to go outside and mountain bike.",
  });

  await buildUser({
    name: "chris",
    description: "i like to go outside",
  });

  await buildUser({
    name: "jon",
    description: "i like to hack on ai project",
  });

  await buildUser({
    name: "jane",
    description: "i like to learn machine learning",
  });

  return Response.json({ message: "seeded users!" });
}
