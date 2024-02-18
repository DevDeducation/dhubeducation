import type { RequestHandler } from "./$types";
import { client } from "../../../../tina/__generated__/client"
import { json } from "@sveltejs/kit";
import type { iSlider } from "$lib";

export const GET: RequestHandler = async () => {

  const sliders = (await client.queries.homepagesliderConnection())
  .data.homepagesliderConnection.edges?.map(edge => {
    return {
      order: edge?.node?.order,
      background: edge?.node?.background,
      title: edge?.node?.title,
      subline: edge?.node?.subline,
      href: edge?.node?.href,
      text: edge?.node?.text
    }
  }).sort((a, b) => Number(a.order) - Number(b.order)) as unknown as iSlider[]
  
  return json(sliders);
};