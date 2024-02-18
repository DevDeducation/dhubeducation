import { type iSession, Constants, Collection } from "$lib";
import { deleteDocument, getDocumentsInCollection } from "$lib/firebase/server";
import { encodeString } from "$lib/server";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const { email } = await request.json()
  const refererCode = encodeString(email).toString()
  const docs = await getDocumentsInCollection({
    collectionId: Collection.REFEREES,
    where: { key: Constants.REFERER, op: "==", value: refererCode }
  })
  return json(docs)
};

export const DELETE: RequestHandler = async ({ request }) => {
  const { email } = await request.json()
  const response = await deleteDocument({
    collectionId: Collection.REFEREES,
    docId: email, data: {}
  })
  console.log("response", response)
  return json({ ...response })
};