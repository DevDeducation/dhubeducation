// See https://kit.svelte.dev/docs/types#app

import type { iSession } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: string;
			id: string;
		}
		interface Locals {
			formData: Record<string, any>
			userSession: iSession | undefined;
			registered: Record<string, any> | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
