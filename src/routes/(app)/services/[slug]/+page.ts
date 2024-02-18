import { type iAffiliate, utils, type iService } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let services: iService[] = []
  let service: iService | null = null

  const paths = import.meta.glob('/src/content/services/*.md', {
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
      const metadata = file.metadata as Omit<iService, 'slug'>
      const serviceToPush = { ...metadata, slug, content: file.default } satisfies iService
      
      if (slug.toLowerCase() === params.slug.toLowerCase()) {
        service = serviceToPush
      } else {
        services.push(serviceToPush)
      }

    }
  }
  services.unshift(service as iService)

  return {
    services,
    service
  };
};