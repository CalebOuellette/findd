import { buildUser } from "@/app/controllers/user";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const { description, name } = await request.json();

  // todo validate input

  const userResult = await buildUser({ name, description });

  return Response.json({
    user: userResult,
  });
}
