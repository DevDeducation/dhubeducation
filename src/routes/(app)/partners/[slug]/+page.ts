import { utils, type iPartner } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let partners: iPartner[] = []
  let partner: iPartner | null = null

  const paths = import.meta.glob('/src/content/partners/*.md', {
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
      const metadata = file.metadata as Omit<iPartner, 'slug'>
      const partnerToPush = { ...metadata, slug, content: file.default } satisfies iPartner
      
      if (slug.toLowerCase() === params.slug.toLowerCase()) {
        partner = partnerToPush
      } else {
        partners.push(partnerToPush)
      }

    }
  }
  partners.unshift(partner as iPartner)

  return {
    partners,
    partner
  };
};