import type { Action } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { Constants, utils } from '$lib';

export const load = (async () => {
  return {};
}) satisfies PageLoad;