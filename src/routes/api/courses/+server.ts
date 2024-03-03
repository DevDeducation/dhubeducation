import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

  const services = (await client.queries.courseConnection())
  .data.courseConnection.edges?.map(edge => {
    return { 
      name: edge?.node?.name,
      title: edge?.node?.title,
      banner: edge?.node?.banner,
      caption: edge?.node?.caption,
      body: edge?.node?.body,
      slug: edge?.node?._sys.filename.toLowerCase()
    }
  })
  
  return json(services);
}; 