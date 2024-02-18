import { type iAffiliate, utils, type iBlog } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let blogs: iBlog[] = []
  let blog: iBlog | null = null

  const paths = import.meta.glob('/src/content/blog/*.md', {
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
      const metadata = file.metadata as Omit<iBlog, 'slug'>
      const blogToPush = { ...metadata, slug, content: file.default } satisfies iBlog
      
      if (slug.toLowerCase() === params.slug.toLowerCase()) {
        blog = blogToPush
      } else {
        blogs.push(blogToPush)
      }

    }
  }
  blogs.unshift(blog as iBlog)

  return {
    blogs,
    blog
  };
};