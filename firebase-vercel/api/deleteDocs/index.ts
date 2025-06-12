import type { VercelRequest, VercelResponse } from "@vercel/node"

import { deleteDocs } from "../_firebase"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, docIds }
  }: { body: { collectionName: string; docIds: string[] } } = req

  res.send(await deleteDocs(collectionName, docIds))
}
