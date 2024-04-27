import { edgeDbClient } from "@/app/lib/edgedb";

export const dynamic = "force-dynamic";
export async function GET() {
  await edgeDbClient.execute(
    `
    delete User
  `
  );

  //  console.log(result.id);

  return Response.json({
    message: "Deleted all users!",
  });
}

// User table
