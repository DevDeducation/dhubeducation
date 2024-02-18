import { Collection } from "$lib";
import { setDocumentWithMerge } from "$lib/firebase/server";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {

  const data = await request.json()
  try {
    await setDocumentWithMerge({
      collectionId: Collection.USERS,
      data,
      docId: data.email
    })
    delete data.referer
    await setDocumentWithMerge({
      collectionId: Collection.REFEREES,
      data,
      docId: data.email
    })
    return new Response("register", { status: 200 })
    // return new Response()
  } catch (error: any) {
    // I'm to store body into firebase with admin sdk here
    return new Response(error.message, { status: 401 });
  }
  
};