import { Collection } from '$lib';
import { getDocumentInCollection, setDocumentWithMerge } from '$lib/firebase/server';
import { decodeString, routeGuard } from '$lib/server';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
  await routeGuard(locals, url)
  const param = url.pathname.split("/")
  const path = param.at(-1)
  try {    
    const refereeEmail = decodeString(path as string)

    const response = await getDocumentInCollection({
      collectionId: Collection.REFEREES,
      where: { key: "email", op: "==", value: refereeEmail }
    })

    return { ...response };
  } catch (error: any) {
    return { status: "error", message: error.message, data: null }
  }
}) satisfies PageServerLoad;

const edit: Action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())

  
  const response = await setDocumentWithMerge({
    collectionId: Collection.REFEREES,
    data, docId: data.email as string
  })

  // todo supply update action here
  return { ...response };
}

export const actions: Actions = {
  edit
};