import type { Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { encodeString, routeGuard } from '$lib/server';
import { Collection, Constants, Flags, type iSession } from '$lib';
import { getDocumentInCollection, getDocumentsInCollection, handleResponse, setDocumentWithMerge } from '$lib/firebase/server';

export const load = (async ({ locals, url }) => {
  await routeGuard(locals, url)
  // todo fetch referees list
  return {};
}) satisfies PageServerLoad;


const add: Action = async ({ request, locals }) => {
  const formData = await request.formData()
  const { email } = locals.userSession as iSession
  const data = Object.fromEntries(formData.entries()) as Record<string, any>
  const docId = data.email as string

  // attach remaining keys
  data.referer = email
  data.timestamp = Date.now().toString()
  data.confirmed = Flags.FALSE
  data.paid = Flags.FALSE

  const referees = await getDocumentInCollection({
    collectionId: Collection.REFEREES,
    where: { key: "email", op: "==", value: data.email as string }
  })

  if (referees.status === "success") {
    const response = handleResponse("Referee already exist! Add another person", "error", null)
    return { ...response }
  }
  // todo check if referee, exists, if so, return an error, if not setdocumentwithmerge

  const response = await setDocumentWithMerge({
    collectionId: Collection.REFEREES,
    data, docId
  })

  return { ...response }
} 

export const actions: Actions = {
  add
};