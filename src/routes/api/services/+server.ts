import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

  const services = (await client.queries.serviceConnection())
  .data.serviceConnection.edges?.map(edge => {
    return {
      order: edge?.node?.order,
      name: edge?.node?.name,
      description: edge?.node?.description,
      landscapepic: edge?.node?.landscapepic,
      squarepic: edge?.node?.squarepic,
      body: edge?.node?.body,
      slug: edge?.node?._sys.filename.toLowerCase()
    }
  })?.sort((a, b) => Number(a.order) - Number(b.order))
  
  return json(services);
}; 