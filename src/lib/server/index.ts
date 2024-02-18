// import { isRegistered } from "$lib/firebase/server"
import { Collection, Constants } from "$lib/constants"
import { getDocumentsInCollection } from "$lib/firebase/server"
import { redirect } from "@sveltejs/kit"

export const routeGuard = async (locals: App.Locals, url: URL) => {
  // const fromUrl = url.pathname + url.search
  const json = Object.fromEntries(url.searchParams.entries())
  if (!json.redirectTo) {
    json.redirectTo = url.pathname
  }
  const searchParams = new URLSearchParams(json).toString()
  // const redirectSuffix = `?redirectTo=${fromUrl}`
  if (!locals.userSession) {
    throw redirect(303, `/login?${searchParams}`)
  } else {
    if (!locals.registered) {
      throw redirect(302, `/register?${searchParams}`)
    }
  }
}

export const stringToUniqueNumber = (inputString: string) => {
  let hash = 0;
  if (inputString.length === 0) return hash;

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash); // Make the number positive
}

export const uniqueNumberToString = (uniquePositiveNumber: number) => {
  let result = '';
  while (uniquePositiveNumber > 0) {
    const charCode = uniquePositiveNumber % 256;
    result = String.fromCharCode(charCode) + result;
    uniquePositiveNumber = (uniquePositiveNumber - charCode) / 256;
  }
  return result;
}

export const getReferees = async (email: string) => {
  return await getDocumentsInCollection({
    collectionId: Collection.REFEREES,
    where: { key: Constants.REFERER, op: "==", value: email }
  })
}

export const encodeString = (str: string) => btoa(str)

export const decodeString = (str: string) => atob(str)

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/\./g, '-')          // Replace dots with -
    .replace(/[^\w-]+/g, '')      // Remove all non-word characters
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')           // Remove leading -
    .replace(/-+$/, '');          // Remove trailing -
}
