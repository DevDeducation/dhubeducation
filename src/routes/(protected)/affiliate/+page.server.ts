import type {iReferee, iSession } from '$lib';
import { getReferees, routeGuard } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {

  await routeGuard(locals, url)

  const { email } = locals.userSession as iSession
  const response = await getReferees(email as string)

  // todo: check response.status for error and throw errors if any

  const referees: iReferee[] = response.data as iReferee[]


  const added = referees.length
  const confirmed = referees.filter(referee => referee.confirmed).length
  const paid = referees.filter(referee => referee.paid).length

  return { added, confirmed, paid };
}) satisfies PageServerLoad;