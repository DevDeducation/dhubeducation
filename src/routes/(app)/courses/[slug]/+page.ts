import { utils, type iCourse } from "$lib";
import type { Actions } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let courses: iCourse[] = []
  let course: iCourse | null = null

  const paths = import.meta.glob('/src/content/course/*.md', {
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
      const metadata = file.metadata as Omit<iCourse, 'slug'>
      const courseToPush = { ...metadata, slug, content: file.default } satisfies iCourse
      
      if (slug.toLowerCase() === params.slug.toLowerCase()) {
        course = courseToPush
      } else {
        courses.push(courseToPush)
      }

    }
  }
  courses.unshift(course as iCourse)

  return {
    courses,
    course
  };
};

// export const actions: Actions = {
//   default: async() => {
//     return {
//       status: 200,
//       body: {
//         message: "Hello World"
//       }
//     };
//   }
// };