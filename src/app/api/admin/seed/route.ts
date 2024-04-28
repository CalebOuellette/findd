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
    name: "jake",
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

  await buildUser({
    name: "josh",
    description: "I recently got into sewing and I'm loving it!",
  });

  await buildUser({
    name: "elise",
    description: "i love exploring new cuisines and cooking techniques.",
  });

  await buildUser({
    name: "mike",
    description: "i enjoy building custom mechanical keyboards.",
  });

  await buildUser({
    name: "sara",
    description: "i am passionate about digital photography and photo editing.",
  });

  await buildUser({
    name: "leo",
    description: "i like to write poetry in my free time.",
  });

  await buildUser({
    name: "kim",
    description: "i recently started learning to play the guitar.",
  });

  await buildUser({
    name: "alex",
    description: "i am fascinated by astronomy and star gazing.",
  });

  return Response.json({ message: "seeded users!" });
}
