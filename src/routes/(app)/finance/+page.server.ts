import { Collection } from '$lib';
import { setDocumentWithMerge } from '$lib/firebase/server';
import type { Action, Actions, PageServerLoad } from './$types';
import type { iSlider } from "$lib";
import { getMetadata } from "$lib";

export const load: PageServerLoad = async () => {
  let slider: iSlider | null = null

  const sliderspaths = import.meta.glob('/src/content/homepagesliders/finance.md', { eager: true })

  slider = getMetadata(sliderspaths)[0] as iSlider

  return { slider };
};
