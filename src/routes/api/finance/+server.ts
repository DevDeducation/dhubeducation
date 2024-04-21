import { setDocumentWithMerge } from "$lib/firebase/server";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { Collection } from "$lib";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()
  const response = await setDocumentWithMerge({
    collectionId: Collection.FINANCE,
    data,
    docId: data.email 
  })
  const message = response.status === "success" ? "Application successfully submitted. We will contact you on the next steps" : response.message
  return json({ ...response, message });
};