import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    userSession: locals.userSession,
    registered: locals.registered
  }
};