import type { Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Constants, utils } from '$lib';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

const enquiry: Action = async ({ request, locals }) => {
  const data = locals.formData
  const text = utils.whatsapp(data)
  const phone = Constants.DHUBEDUCATION_PHONE
  const entries: Record<string, string> = { text, phone }
  const url = utils.formURL(entries, Constants.WHATSAPPAPI)

  // todo: store in database here

  return {
    success: true,
    payload: JSON.stringify(url)
  }
}

export const actions: Actions = {
  enquiry
};