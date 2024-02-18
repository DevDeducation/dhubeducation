import type { Action } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Collection } from '$lib';
import { setDocumentWithMerge } from '$lib/firebase/server';

import type { iSlider } from "$lib";
import { getMetadata } from "$lib";

export const load: PageServerLoad = async () => {
  let slider: iSlider | null = null

  const sliderspaths = import.meta.glob('/src/content/homepagesliders/contact-us.md', { eager: true })

  slider = getMetadata(sliderspaths)[0] as iSlider

  return { slider };
};

const contact: Action = async ({ request, locals }) => {
  const data = await request.formData()
  const entries = Object.fromEntries(data.entries())

  const response = await setDocumentWithMerge({
    collectionId: Collection.CONTACT,
    data: entries,
    docId: entries.email as string
  })

  if (response.status === "success") {
    response.message = "Successfully submitted your request. We will reply you via the submitted email shortly 🚀🚀🚀"
  }

  return {  ...response }
}

export const actions: Actions = {
  contact
};