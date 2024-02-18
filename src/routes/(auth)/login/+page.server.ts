import { isRegistered } from '$lib/firebase/server';
import { redirect, type Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
  const fromUrl = url.search
  const redirectTo = fromUrl.replace('/','')
  if (locals.userSession) {
    const email = locals.userSession.email as string
    const registered = await isRegistered(email) 

    if (registered) {
      throw redirect(302, `/${redirectTo}`)
    } else {
      throw redirect(302, '/register')
    }
  }
  return {};
}) satisfies PageServerLoad;

const login: Action = async () => {
  
}

export const actions: Actions = {
  login
};