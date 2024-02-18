import { routeGuard } from '$lib/server';
import type { LayoutServerLoad } from './$types';


export const load = (async ({ locals, url }) => {
  await routeGuard(locals, url)

  return {
    userSession: locals.userSession,
    registered: locals.registered
  };
}) satisfies LayoutServerLoad;