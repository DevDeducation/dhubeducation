
import { getFirebaseAdmin } from "$lib/firebase/server";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  
  const body = (await request.json()) as { idToken: string | undefined }

  if (!body.idToken) {
    console.info("No idToken found")
    throw redirect(303, "/login")
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000
  const admin = getFirebaseAdmin()

  const sessionCookie = await admin
  .auth()
  .createSessionCookie(body.idToken, { expiresIn })

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  }

  const headers = new Headers()
  headers.append(
    "set-cookie",
    `session=${sessionCookie}; ${JSON.stringify(options)}`
  )
  return new Response("login", {
    status: 200,
    headers
  });
};

export const DELETE: RequestHandler = async () => {
  const headers = new Headers()
  headers.append("set-cookie", "session=; Max-Age=0")
  return new Response("login", {
    status: 200,
    headers
  });
};

