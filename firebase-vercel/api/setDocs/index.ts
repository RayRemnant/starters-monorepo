import type { VercelRequest, VercelResponse } from "@vercel/node"

import { setDocs } from "../firebase.js"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, docs }
  } = req

  res.send(await setDocs(collectionName, docs))
}
