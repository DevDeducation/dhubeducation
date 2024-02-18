import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    userSession: locals.userSession,
    registered: locals.registered
  };
}) satisfies LayoutServerLoad;