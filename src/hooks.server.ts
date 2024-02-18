
import type { iSession } from "$lib";
import { getFirebaseAdmin, isRegistered } from "$lib/firebase/server";
import type { Handle, RequestEvent } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { parseFormData } from "parse-nested-form-data"

const formData: Handle = async ({ event, resolve }) => {
  if (
    event.url.pathname === "/enquiry" &&
    event.request.method === "POST"
  ) {
    const formData = await event.request.formData()
    const data = parseFormData(formData)

    event.locals.formData = data
  }

  return resolve(event)
}

const decodeClaims = async (session: string) => {
  try {
    const admin = getFirebaseAdmin()
    return await admin
      .auth()
      .verifySessionCookie(session, false)
  } catch (error: any) {
    console.error(`Error verifying session cookie ${error.message}`)
    return undefined
  }
}

const setUserSession = async (decodedClaims: DecodedIdToken | undefined, event: RequestEvent<Partial<Record<string, string>>, string | null>) => {

  if (!decodedClaims) {
    console.error("No decoded claims found")
    event.locals.userSession = undefined
  } else {
    const { uid, picture, email, name } = await decodedClaims
    const session: iSession = { email: email as string, name, picture: picture as string, uid, signedIn: true }
    event.locals.userSession = session
    // if (!name) {
    //   const session: iSession = { email: email as string, name: email as string, picture: picture as string, uid, signedIn: true }
    //   event.locals.userSession = session
    // } else {
    //   const session: iSession = { email: email as string, name, picture: picture as string, uid, signedIn: true }
    //   event.locals.userSession = session
    // }
    
    const registered = await isRegistered(email as string)
    event.locals.registered = registered 
  }
}

const auth: Handle = async ({ event, resolve }) => {
  const now = performance.now()

  const session = event.cookies.get("session") ?? ""
  if (!session || session === "") {
    console.info("No session found")
    event.locals.userSession = undefined
  } else {
    let decodedClaims = await decodeClaims(session)
    await setUserSession(decodedClaims, event)
  }
  console.debug(`Request took ${performance.now() - now}ms`)

  const result = await resolve(event, { transformPageChunk: ({ html }) => html })

  return result
}

export const handle: Handle = sequence(formData, auth)