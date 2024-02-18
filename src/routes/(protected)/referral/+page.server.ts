import type { iSession } from '$lib';
import { getReferees } from '$lib/server';
import type { Actions, PageServerLoad, Action } from './$types';

export const load = (async ({ locals }) => {

  const { email } = locals.userSession as iSession
  const response = await getReferees(email as string)

  // todo: check response.status for error and throw errors if any
  
  return { response };
}) satisfies PageServerLoad;

const remove: Action = async ({ request }) => {
  const formData = await request.formData()
  const entries = Object.fromEntries(formData.entries())
  return {  }
}

export const actions: Actions = {
  remove
};