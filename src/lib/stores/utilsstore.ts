import type { iAlert, iTime } from "$lib/interfaces";
import { Utils } from "$lib/utils/index";

import { writable } from "svelte/store";

export const utilsstore = writable<Utils>(new Utils())

export const alertstore = writable<iAlert>({
  type: "info",
  message: "Welcome",
  active: false
})

export const clockstore = writable<iTime | undefined>()

export const pagestore = writable<string>("home")

export const isloading = writable<boolean>(false)

export const refereestore = writable<Record<string, any>[]>([])