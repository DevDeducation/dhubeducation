import { getMetadata, type iSlider } from "$lib";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
  let slider: iSlider | null = null

  const sliderspaths = import.meta.glob('/src/content/homepagesliders/talk-show.md', { eager: true })

  slider = getMetadata(sliderspaths)[0] as iSlider

  return { slider };
};

export const actions: Actions = {
  default: async() => {
    return {
      status: 200,
      body: {
        message: "Hello World"
      }
    };
  }
};