export const ssr = false

import { utils, type iSlider } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let sliders: iSlider[] = []

  const paths = import.meta.glob('/src/content/homepagesliders/*.md', {
    eager: true
  })

  for (const path in paths) {
    const file = paths[path] as Record<string, any>

    
    if (
      file && 
      typeof file === 'object' && 
      'metadata' in file
    ) {
      const metadata = file.metadata as Omit<iSlider, 'slug'>
      const slidersToPush = { ...metadata } satisfies iSlider
      
      sliders.push(slidersToPush)

    }
  }

  sliders = sliders.sort((a, b) => Number(a.order) - Number(b.order))

  return {
    sliders
  };
};