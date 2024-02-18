import { Collection, Constants, Flags } from "$lib";
import { isRegistered, setDocumentWithMerge } from "$lib/firebase/server";
import { redirect, type Action, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
  const fromUrl = url.search
  const redirectTo = fromUrl.replace('/','')
  if (locals.userSession) {
    const email = locals.userSession.email as string
    const registered = await isRegistered(email) 

    if (registered) {
      throw redirect(302, `/${redirectTo}`)
    }
  }
};

const storeDocument = async (entries: Record<string, any>) => {
  await setDocumentWithMerge({
    collectionId: Collection.USERS,
    data: entries,
    docId: entries.email
  })
  await setDocumentWithMerge({
    collectionId: Collection.REFEREES,
    data: entries,
    docId: entries.email
  })
}


const google: Action = async ({ request }) => {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData.entries()) as Record<string, any>
  const redirectTo = entries.redirect ? entries.redirect : '/'
  delete entries.redirect

  entries.confirmed = Flags.TRUE
  entries.paid = Flags.FALSE

  await storeDocument(entries)

  const url = redirectTo ? redirectTo.split("/")[1] : ""

  throw redirect(302, `/${url}`)
}

const emailandpassword: Action = async ({  }) => {}

export const actions: Actions = {
  google,
  emailandpassword
} satisfies Actions