import type { VercelRequest, VercelResponse } from "@vercel/node"

import { deleteDocs } from "../../lib/firebase.js"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, docIds }
  }: { body: { collectionName: string; docIds: string[] } } = req

  res.send(await deleteDocs(collectionName, docIds))
}
