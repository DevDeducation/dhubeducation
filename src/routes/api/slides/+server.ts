import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

  const slides = (await client.queries.slideConnection())
  .data.slideConnection.edges?.map(edge => {
    return {
      name: edge?.node?.name,
      type: edge?.node?.type,
      slug: edge?.node?._sys.filename,
      list: edge?.node?.list?.map(item => item?.image)
    }
  })
  
  return json(slides);
};