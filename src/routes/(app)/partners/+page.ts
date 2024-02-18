import type { iSlider } from "$lib";
import { getMetadata } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  let slider: iSlider | null = null

  const sliderspaths = import.meta.glob('/src/content/homepagesliders/partners.md', { eager: true })

  slider = getMetadata(sliderspaths)[0] as iSlider

  return { slider };
};