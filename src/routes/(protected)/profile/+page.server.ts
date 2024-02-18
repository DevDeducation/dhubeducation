import { Collection } from '$lib';
import { setDocumentWithMerge } from '$lib/firebase/server';
import { routeGuard } from '$lib/server';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
  // await routeGuard(locals, url)
  return {};
}) satisfies PageServerLoad;

const update: Action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  const docId = data.email as string
  data.timestamp = Date.now().toString()

  const response = await setDocumentWithMerge({
    collectionId: Collection.USERS,
    data, docId
  })
  return { ...response, message: "successfully updated record" }
}

export const actions: Actions = {
  update
};