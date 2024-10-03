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
  
  // return json(popups);
  return json({
    active: true,
    name: "Talk Show",
    startdate: "October 10, 2024 12:00 PM",
    enddate: "October 10, 2024 3:00 PM",
    image: "https://www.dhubeducation.com/uploads/talk-show.webp"
  })
};