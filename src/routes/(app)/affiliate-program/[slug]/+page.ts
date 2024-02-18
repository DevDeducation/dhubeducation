import { type iAffiliate, utils } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let affiliates: iAffiliate[] = []
  let affiliate: iAffiliate | null = null

  const paths = import.meta.glob('/src/content/affiliates/*.md', {
    eager: true
  })

  for (const path in paths) {
    const file = paths[path] as Record<string, any>
    const slug = utils.slugify(path) as string

    
    if (
      file && 
      typeof file === 'object' && 
      'metadata' in file && 
      slug
    ) {
      const metadata = file.metadata as Omit<iAffiliate, 'slug'>
      const affiliateToPush = { ...metadata, slug, content: file.default } satisfies iAffiliate
      
      if (slug.toLowerCase() === params.slug.toLowerCase()) {
        affiliate = affiliateToPush
      } else {
        affiliates.push(affiliateToPush)
      }

    }
  }
  affiliates.unshift(affiliate as iAffiliate)

  return {
    affiliates,
    affiliate
  };
};