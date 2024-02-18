import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";
import type { iBlog } from "$lib";

export const GET: RequestHandler = async () => {
  let posts: iBlog[] = []
  const blogs = (await client.queries.blogConnection())
  .data.blogConnection.edges?.map(edge => {
    return {
      title: edge?.node?.title,
      banner: edge?.node?.banner,
      thumbnail: edge?.node?.thumbnail,
      caption: edge?.node?.caption,
      date: edge?.node?.date,
      category: edge?.node?.category,
      body: edge?.node?.body,
      slug: edge?.node?._sys.filename.toLowerCase()
    }
  }) as iBlog[]
  
  posts = blogs.sort((a, b) => +new Date(b.date as string) - +new Date(a.date as string))
  return json(posts);
};