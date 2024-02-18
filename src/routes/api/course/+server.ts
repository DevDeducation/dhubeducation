import { handleResponse, setDocumentWithMerge } from "$lib/firebase/server";
import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()
  const { email } = data

  try {
    await setDocumentWithMerge({
      collectionId: "course",
      data,
      docId: email
    })
    const response = handleResponse("Successfully submitted data", "success")
    return json(response);
  } catch (error: any) {
    const response = handleResponse(error.message, "error")
    return json(response);
  }
};