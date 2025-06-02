import type { VercelRequest, VercelResponse } from "@vercel/node"

import { getDoc } from "../_firebase.js"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, docId }
  } = req

  res.send(await getDoc(collectionName, docId))
}
