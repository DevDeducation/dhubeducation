import type { RequestHandler } from './$types';
import client from '../../../../tina/__generated__/client';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const partners = (await client.queries.partnersConnection())
  .data.partnersConnection.edges?.map(edge => {
    return {
      name: edge?.node?.name,
      type: edge?.node?.type,
      website: edge?.node?.website,
      logo: edge?.node?.logo,
      squarepic: edge?.node?.squarepic,
      landscapepic: edge?.node?.landscapepic,
      country: edge?.node?.country,
      countrycode: edge?.node?.countrycode,
      latitude: edge?.node?.latitude,
      longitude: edge?.node?.longitude,
      body: edge?.node?.body.children[0].children[0].text,
      slug: edge?.node?._sys.filename.toLowerCase(),
      content: edge?.node?.body.children[0].children[0].text
    }
  })
  return json(partners)
};