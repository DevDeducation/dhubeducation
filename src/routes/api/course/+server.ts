import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()

  console.log(body)
  return json({ message: "Hello World" });
};