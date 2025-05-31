import type { VercelRequest, VercelResponse } from "@vercel/node"

import { deleteDoc } from "../../lib/firebase.js"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, docId }
  } = req

  res.send(await deleteDoc(collectionName, docId))
}
