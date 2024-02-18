import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

  const affiliates = (await client.queries.affiliatesConnection())
  .data.affiliatesConnection.edges?.map(edge => {
    return {
      type: edge?.node?.type,
      caption: edge?.node?.caption,
      squarepic: edge?.node?.squarepic,
      landscapepic: edge?.node?.landscapepic,
      body: edge?.node?.body,
      slug: edge?.node?._sys.filename.toLowerCase()
    }
  })
  
  return json(affiliates);
};