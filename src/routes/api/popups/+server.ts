import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

  const popups = (await client.queries.popupConnection())
  .data.popupConnection.edges?.map(edge => {
    const startdate = +new Date(edge?.node?.startdate as string)
    const enddate = +new Date(edge?.node?.enddate as string)
    return {
      active: edge?.node?.active,
      name: edge?.node?.name,
      startdate,
      enddate,
      image: edge?.node?.image
    }
  }).filter(popup => popup.active)
  .filter(popup => Date.now() >= +popup.startdate && Date.now() < +popup.enddate)
  
  return json(popups);
};